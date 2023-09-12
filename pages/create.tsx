import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { parseCookies } from 'nookies'; 

let token:any = null;
export function setTokenCreate(newToken:any):void{
  token = `Bearer ${newToken}`;
}


const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoState, setVideoState] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const loggedUser = cookies.loggedUser;
    if (loggedUser){
      const user = JSON.parse(loggedUser);
      setUser(user);
      setTokenCreate(user.token);
    }
  },[])


  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      setLoading(true); // Enable the spinner
      let response;
      let video_url;
      if (videoState){
        formData.append("inputFile", videoState);
        response = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        video_url = data.secure_url;
      }
      
      if (user){
        var email = user.email;
      }
      const body = { title, content, email, video_url};
      const res = await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(body),
      });
      if (res.status === 403){
        window.alert("log in to post!");
        await Router.push("/");
      }
      else{
        await Router.push("/drafts");
      }

    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false); // Disable submitting state
    }
  };

  const onChange = async (event:any) => {
    event.preventDefault();
    const file = event.target.files[0];
    //if (file){
      //formData.append("inputFile", file);
      setVideoState(file);
    //}
    
  }

  function onClickCancel() {
    //formData.delete("inputFile");
    setVideoState(null);
  }


  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title || loading} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
          <div>
          {videoState ? (
            <div>
              <span>{videoState.name}</span>
              <button type="button" onClick={onClickCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="files">select video</label>
              <input id="files" type="file" onChange={onChange} className="hidden" />
            </div>
          )}
        </div>
        </form>
        {loading && <a>loading...</a>} {/* Render the spinner outside the form element */}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
