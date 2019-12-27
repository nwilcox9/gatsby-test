
import { useStaticQuery, graphql } from 'gatsby'
import './hero-page.css'

formatInfo(heroInfo)
{
  let formatted = Object.entries(heroInfo).filter(
    entry =>
      entry[0] !== 'response' &&
      entry[0] !== 'id' &&
      entry[0] !== 'name' &&
      entry[0] !== 'aliases'
  )
  formatted = formatted.map(entry => {
    return (
      <span key={entry[0]} style={{ display: 'flex', flexDirection: 'row' }}>
        <p>{entry[0].slice(0, 1).toUpperCase() + entry[0].slice(1) + ':'}</p>
        <p style={{ marginLeft: 6 }}>
          {entry[1] !== 'null' ? entry[1] : 'unknown'}
        </p>
      </span>
    )
  })
  return formatted
}

export default ({ pageContext: { heroInfo } }) => {
  const data = useStaticQuery(
    graphql`
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
      }
    `
  )

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{data.allDataJson.edges[0].node.home.title}</h1>
      <div id="heroInfo">
        <h2 id="heroName">{heroInfo.info.name}</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ maxWidth: `200px` }}>
            <img
              src={heroInfo.pic.url}
              style={{ marginBottom: 0 }}
              alt="hero"
            />
          </div>
          <div
            style={{
              backgroundColor: 'grey',
              width: 2,
              marginBottom: 5,
              marginLeft: 30,
              marginRight: 30,
            }}
          ></div>
          <div>{this.formatInfo()}</div>
        </div>
      </div>
      <br />
    </Layout>
  )
}
