import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css'

const ID_MAX = 731
const SUP_TOKEN = '2631759303572231'

class IndexPage extends React.Component
{
  constructor( {props, data} )
  {
    super(props)
    this.state = {
      data: data,
      heroInfo: {},
      heroImgSrc: '',
    }
  }

  componentDidMount()
  {
    this.getRandomSuperhero()
  }

  async getRandomSuperhero()
  {
    let id = Math.floor(Math.random() * ID_MAX)
    // let statsUrl = 'https://superheroapi.com/api/' + SUP_TOKEN + '/' + id + '/powerstats'
    let bioUrl =
      'https://superheroapi.com/api/' + SUP_TOKEN + '/' + id + '/biography'
    let picUrl = 'https://superheroapi.com/api/' + SUP_TOKEN + '/' + id + '/image'
    let results = await Promise.all([
      // fetch(statsUrl),
      fetch(bioUrl),
      fetch(picUrl),
    ])
    let stats = await results[0].json()
    let pic = await results[1].json()
    console.log(stats, pic)
    this.setState({
      heroInfo: stats,
      heroImgSrc: pic.url,
    })
  }


  formatInfo()
  {
    let formatted = (Object.entries(this.state.heroInfo)).filter(entry => (
      entry[0] !== 'response' && entry[0] !== 'id' && entry[0] !== 'name' && entry[0] !== 'aliases'
    ))
    formatted = formatted.map(entry => {
      return <span key={entry[0]} style={{ display: "flex", flexDirection: 'row' }}>
        <p>{entry[0].slice(0,1).toUpperCase() + entry[0].slice(1) + ':'}</p>
        <p style={{ marginLeft: 6 }}>{entry[1] !== 'null' ? entry[1] : 'unknown'}</p>
      </span>
    })
    return formatted
  }

  render()
  {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>{this.state.data.allDataJson.edges[0].node.home.title}</h1>
        <div id='heroInfo'>
          <h2 id='heroName'>{this.state.heroInfo.name}</h2>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div style={{ maxWidth: `200px`}}>
              <img src={this.state.heroImgSrc} style={{ marginBottom: 0 }} alt='hero'/>
            </div>
            <div style={{ backgroundColor: 'grey', width: 2, marginBottom: 5, marginLeft: 30, marginRight: 30}}></div>
            <div>
              {this.formatInfo()}
            </div>
          </div>
        </div>
        <br/>
      </Layout>
    )
  }
}

export default IndexPage

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
`
