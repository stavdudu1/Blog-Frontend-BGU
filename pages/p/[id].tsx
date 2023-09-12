import React, {useEffect, useState} from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import { parseCookies } from 'nookies'; 
let token:any = null;
export function setTokenPublishDelete(newToken:any):void{
  token = `Bearer ${newToken}`;
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post ?? { author: { name: "Me" } }
  };
};

async function publishPost(id: number): Promise<void> {
  const response = await fetch(`/api/publish/${id}`, {
    method: "PUT",
    headers: { authorization: token },
  });
  if (response.status === 403){
    window.alert("log in as author to publish post!")
  }
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
    headers: { authorization: token },
  });
  if (response.status === 403){
    window.alert("log in as author to delete post!")
  }
  await Router.push("/")
}

const Post: React.FC<PostProps> = (props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const loggedUser = cookies.loggedUser;
    if (loggedUser){
      const user = JSON.parse(loggedUser);
      setUser(user);
      setTokenPublishDelete(user.token);
    }
  },[])
  
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {props.video_url ? (<video width="320" height="240" autoPlay
              controls
              muted
              src={props.video_url}>
        </video>):null}
        <div>
        {!props.published && user && props.author?.email === user.email ? (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        ):null}
        {user && props.author?.email === user.email ? (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        ): null}
        </div>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
