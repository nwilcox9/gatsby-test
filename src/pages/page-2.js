import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const SecondPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title={data.allDataJson.edges[0].node.page_2.title} />
      <br/>
      <h1>{data.allDataJson.edges[0].node.page_2.title}</h1>
      <p>{data.allDataJson.edges[0].node.page_2.subtitle}</p>

      <br/>
      <Image src={data.file.childImageSharp.fluid}/>

      <br/>
      <div>
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}



export default SecondPage

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
    },
    file(relativePath: {eq: "universe.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`