import React from "react";
import styled from "styled-components";

export default function Blog() {
  const blogs = [
    { name: "Falcon now supports Binance", date: "Jul 15, 2024" },
    { name: "TON Chain Now Integrated", date: "Jul 15, 2024" },
    { name: "Bridging is now live.", date: "Jul 15, 2024" },
  ];
  return (
    <BlogWrapper>
      <div className="wrapper">
        <h1>From our blog</h1>
        <div className="blog-list">
          {blogs.map((blog, blogIndex) => (
            <div className="blog" key={"blog-" + blogIndex}>
              <div className="blog-img"></div>
              <h3>{blog.name}</h3>
              <p>{blog.date}</p>
            </div>
          ))}
        </div>
      </div>
    </BlogWrapper>
  );
}

const BlogWrapper = styled.div`
  padding: 68px 0px;
  max-width: 1074px;
  margin: 0px auto;
  .wrapper {
    h1 {
      // font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: left;
      color: #e8e8e8;
      margin-bottom: 44px;
    }
    .blog-list {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      .blog {
        .blog-img {
          width: 342px;
          height: 211px;
          border-radius: 18px;
          background: white;
          margin-bottom: 24px;
        }
        h3 {
          // font-family: Inter;
          font-size: 18px;
          font-weight: 500;
          line-height: 21.78px;
          text-align: left;
          color: #e8e8e8;
          margin: 0px;
        }
        p {
          // font-family: Inter;
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          text-align: left;
          color: #6e7073;
          margin: 0px;
        }
      }
    }
  }
  @media (max-width: 880px) {
    padding: 48px 20px;
    .wrapper {
      .blog-list {
        justify-content: center;
        .blog,
        .blog .blog-img {
          width: 100%;
        }
      }
    }
  }
`;
