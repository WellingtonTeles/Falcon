import React from "react";
import styled from "styled-components";

export default function PrototypeGallery() {
  const galleries = [
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      src: "",
    },

    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      src: "",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      src: "",
    },
  ];
  return (
    <PrototypeGalleryWrapper>
      <div className="wrapper">
        <h1>Prototypes Gallery</h1>
        <p>
          <span>Lorem ipsum dolor sit amet, consectetur</span> adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
        </p>
        <div className="gallery-list">
          {galleries.map((gallery, galleryIndex) => (
            <div className="gallery" key={"gallery-" + galleryIndex}>
              <div className="gallery-img"></div>
              <h3>{gallery.name}</h3>
              <p>{gallery.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PrototypeGalleryWrapper>
  );
}

const PrototypeGalleryWrapper = styled.div`
  padding: 68px;
  background: white;
  .wrapper {
    max-width: 1074px;
    margin: 0px auto;
    h1 {
      // font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: center;
      color: #000000;
      margin-bottom: 24px;
    }
    p {
      //   font-family: Inter;
      font-size: 16px;
      line-height: 26px;
      font-weight: 400;
      color: #6e7073;
      text-align: center;
      span {
        font-weight: 500;
        color: black;
      }
    }
    .gallery-list {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      .gallery {
        max-width: 294px;
        .gallery-img {
          border-radius: 18px;
          background: white;
          margin-bottom: 24px;
        }
        h3 {
          // font-family: Inter;
          font-size: 16px;
          font-weight: 4500;
          line-height: 21.78px;
          text-align: left;
          color: #000;
          margin: 0px;
          margin-bottom: 10px;
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
    padding: 68px 20px;
  }
`;
