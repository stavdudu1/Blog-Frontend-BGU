import React from "react";
import {useState, useEffect} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";



export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  video_url: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const authorName = post.author ? post.author.name : "Unknown author";
  if (domLoaded)
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h1>{post.title}
      {post.video_url && (
        <span className="video-icon">
        <FontAwesomeIcon icon={faVideo} />
        </span>
      )}
      </h1>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      {post.video_url ? (<video width="320" height="240" autoPlay
              controls
              muted
              src={post.video_url}>
        </video>):null}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }

        .title-container {
          display: flex;
          align-items: center;
        }

        .video-icon {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
  return null;
};


export default Post;
