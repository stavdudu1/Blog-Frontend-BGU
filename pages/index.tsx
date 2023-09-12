import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import Pagination from "../components/Pagination";

const PER_PAGE = 10

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? parseInt(context.query.page as string) : 1
  const feed = await prisma.post.findMany({
    take: PER_PAGE,
    skip: (page - 1)* PER_PAGE,
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  const count = await prisma.post.count({
    where:{published:true}
  })
  return {
    props: {feed, page, count},
  };
};

type Props = {
  feed: PostProps[];
  page: number;
  count: number;
};

const Blog: React.FC<Props> = (props) => {
  const finalPage = Math.ceil(props.count/PER_PAGE) != 0 ? Math.ceil(props.count/PER_PAGE) : 1
  let currPage = props.page

  const nextPage = currPage + 1
  const prevPage = currPage - 1
  const rangeStart = Math.max(1, currPage - 3)
  const rangeEnd = Math.min(finalPage, currPage + 3)

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
        <Pagination finalPage={finalPage} currPage={currPage} nextPage={nextPage} prevPage={prevPage} rangeStart={rangeStart} rangeEnd={rangeEnd} /*handlePageChange={handlePageChange}*/></Pagination>
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

export default Blog;
