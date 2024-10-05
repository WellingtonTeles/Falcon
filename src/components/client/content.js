import React from "react";
import styled from "styled-components";
import acme_book from './../../../src/assets/images/acme_book.png';

export default function Content(props) {
    const resources = [
        { title: 'How to Optimize Postgres Performance for Large-Scale Data Analytics', views: 107 },
        { title: 'How to Integrate Postgres with Cloud Services and Platforms', views: 42 },
        { title: 'Postgres vs. Other Relational Dtabases: A Comparative Study of Features & ...', views: 99 },
        { title: 'Postgres for achine Learning and AI: Use Cases, Examples, and Solutions', views: 36 } ,
        { title: 'The Future of Postgres: Trends, Innovations, and Opportunities', views: 85 },
        { title: 'How to Scale Up Your Postgres Database with Replication, Partitioning...', views: 20 },
        { title: 'How to Secure Your Postgres Database from Cyberattacks and Data Breaches', views: 76 },
        { title: 'Postgres for Web Development: How to Build Fast, Reliable and Dynam...', views: 19 },
        { title: 'Postgres Migration: Best Practices, Tools, and Tips', views: 75 },
        { title: 'How to Troubleshoot and Debug Common Postgres Errors and Issues', views: 18 },
    ]
  return (<ContentWrapper>
    <ContentHeader>
        <h2>The top resources your high fit prospects are engaging with </h2>
        <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-secondary active">All time</button>
              <button type="button" className="btn btn-outline-secondary">Last 30 days</button>
              <button type="button" className="btn btn-outline-secondary">Last 7 days</button>
              <button type="button" className="btn btn-outline-secondary">Last 24 hours</button>
        </div>
    </ContentHeader>
    <ContentBody>
        {resources.map((resource, index) => (
            <div className="content-item" key={'content-' + index}>
                <img src={acme_book} alt="ACME_BOOK" />
                <div className="resouce-desp">
                    <h3>{resource.title}</h3>
                    <div className="badge">            
                        {resource.views} views
                    </div>
                </div>
            </div>
        ))

        }
    </ContentBody>
  </ContentWrapper>)
}

const ContentWrapper = styled.div`
    position: relative;
    padding: 0px;
    width: 100%;
`
const ContentHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    h2 {
        color: #101828;
        font-family: Figtree;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 28px; /* 155.556% */
        margin-bottom: 0px;
    }
    .btn-group {
        padding: 0px!important;
    }
    border-bottom: 1px solid #EAECF0;
    padding-bottom:20px;
`
const ContentBody= styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0px;
    .content-item {
        display: flex;
        margin-right: 100px;
        margin-bottom: 40px;
        img {
            width: 49px;
            height: 84px;
            margin-right: 20px;
        }
        .resouce-desp {
            max-width: 300px;
            h3 {
                color: #000;
                font-family: Figtree;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 24px; /* 150% */
            }
            .badge {
                border: 1px solid #CAEBF9;
                padding: 2px 10px;
                background: #E7F7FF;
                border-radius: 16px;
                color: #007AAB;
                text-align: center;
                font-family: Figtree;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 20px; /* 142.857% */
            }
        }
        
    }
`
