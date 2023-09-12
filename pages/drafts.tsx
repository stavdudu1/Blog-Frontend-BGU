import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

// Helper function to parse cookies into an object
const parseCookies = (cookies:any) => {
  return cookies.split(';').reduce((parsed:any, cookie:any) => {
    const [name, value] = cookie.split('=').map((c:any) => c.trim());
    parsed[name] = decodeURIComponent(value);
    return parsed;
  }, {});
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = req.headers.cookie;
  
  // Parse the cookies into an object
  const parsedCookies = parseCookies(cookies);
  
  // Access the specific cookie value
  const myCookieValue = parsedCookies.loggedUser;

  if (!myCookieValue) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  let userLogged = JSON.parse(myCookieValue);
  let token = userLogged.token;
  const decodedToken = jwt.verify(token, process.env.SECRET||"");
    if(!decodedToken){
      res.statusCode = 403;
      return { props: { drafts: [] } };
    }

    const drafts = await prisma.post.findMany({
      where: {
        author: { email: userLogged.email },
        published: false,
      },
      include: {
        author: {
          select: { name: true , email:true},
        },
      },
    });

    return {
      props: { drafts, userLogged },
    };
  
};

type Props = {
  drafts: PostProps[];
  userLogged: User;
};

const Drafts: React.FC<Props> = (props) => {
  const { drafts , userLogged} = props;
  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
