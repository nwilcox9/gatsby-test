import React from "react";
import axios from "axios";
import get from "lodash/get";

import Layout from "../components/layout";
import SEO from "../components/seo";
import "./index.css";

const ID_MAX = 731;
const SUP_TOKEN = "2631759303572231";

// const api = () =>
//   axios.create({
//     headers: {
//       "Access-Control-Allow-Origin": "*"
//     }
//   });

class IndexPage extends React.Component {
  constructor({ props, data }) {
    super(props);
    this.state = {
      data: data,
      heroInfo: {},
      heroImgSrc: ""
    };
  }

  componentDidMount() {
    this.getRandomSuperhero();
  }

  async getRandomSuperhero() {
    let id = Math.floor(Math.random() * ID_MAX);
    let bioUrl = "api/" + SUP_TOKEN + "/" + id + "/biography";
    // let picUrl =
    //   "https://superheroapi.com/api/" + SUP_TOKEN + "/" + id + "/image";
    const response = await axios
      .get(bioUrl)
      .catch(error => this.setState({ error }));
    if (response && response.status === 200) {
      this.setState({ stats: response.data });
    }
    // const picResponse = await fetch(picUrl, {
    //   method: "GET",
    //   mode: "no-cors"
    // });
    // try {
    //   const bioResponse = await fetch(bioUrl, {
    //     method: "GET",
    //     mode: "no-cors"
    //   });
    //   // const picResponse = await fetch(picUrl, {
    //   //   method: "GET",
    //   //   mode: "no-cors"
    //   // });
    //   const stats = await bioResponse.json();
    //   // const pic = await picResponse.json();
    //   debugger;
    //   this.setState({ stats });
    // } catch (err) {
    //   // debugger;
    //   this.setState({ error: err });
    // }
  }

  formatInfo() {
    let formatted = Object.entries(this.state.heroInfo).filter(
      entry =>
        entry[0] !== "response" &&
        entry[0] !== "id" &&
        entry[0] !== "name" &&
        entry[0] !== "aliases"
    );
    formatted = formatted.map(entry => {
      return (
        <span key={entry[0]} style={{ display: "flex", flexDirection: "row" }}>
          <p>{entry[0].slice(0, 1).toUpperCase() + entry[0].slice(1) + ":"}</p>
          <p style={{ marginLeft: 6 }}>
            {entry[1] !== "null" ? entry[1] : "unknown"}
          </p>
        </span>
      );
    });
    return formatted;
  }

  render() {
    const { data, error, pic, stats } = this.state;
    const title = get(data, "allDataJson.edges[0].node.home.title", "Title");
    const name = get(stats, "name");
    console.log("data", this.state.data);

    return (
      <Layout>
        <SEO title="Home" />
        <h1>{title}</h1>

        {error && <h1>{JSON.stringify(error)}</h1>}
        <pre>{JSON.stringify(this.state, null, 4)}</pre>
        <div id="heroInfo">
          <h2 id="heroName">{name}</h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ maxWidth: `200px` }}>
              <img src={pic} style={{ marginBottom: 0 }} alt="hero" />
            </div>
            <div
              style={{
                backgroundColor: "grey",
                width: 2,
                marginBottom: 5,
                marginLeft: 30,
                marginRight: 30
              }}
            ></div>
            <div>{this.formatInfo()}</div>
          </div>
        </div>
        <br />
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query {
    allDataJson {
      edges {
        node {
          home {
            title
            subtitle
          }
        }
      }
    }
  }
`;
