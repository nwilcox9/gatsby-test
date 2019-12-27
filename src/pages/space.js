import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const SecondPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO title={data.allDataJson.edges[0].node.page_2.title} />
      <h1>{data.allDataJson.edges[0].node.page_2.title}</h1>
      <p>{data.allDataJson.edges[0].node.page_2.subtitle}</p>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "60%" }}>
          <img src={data.nasa.url} alt="picture of galaxy" />
        </div>
        <p style={{ width: "40%", marginLeft: 30 }}>
          {data.nasa.description + " (NASA ID:  " + data.nasa.id + ")"}{" "}
        </p>
      </div>
    </Layout>
  );
};

export default SecondPage;

export const query = graphql`
  query {
    allDataJson {
      edges {
        node {
          page_2 {
            title
            subtitle
          }
        }
      }
    }
    nasa {
      id
      description
      url
    }
  }
`;
