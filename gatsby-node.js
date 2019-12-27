/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const fetch = require('fetch')

const ID_MAX = 731
const SUP_TOKEN = '2631759303572231'

async function getRandomSuperhero()
{
  let id = Math.floor(Math.random() * ID_MAX)
  // let statsUrl = 'https://superheroapi.com/api/' + SUP_TOKEN + '/' + id + '/powerstats'
  let bioUrl =
    'https://superheroapi.com/api/' + SUP_TOKEN + '/' + id + '/biography'
  let picUrl = 'https://superheroapi.com/api/' + SUP_TOKEN + '/' + id + '/image'
  let results = await Promise.all([
    // fetch(statsUrl),
    windoew.fetch(bioUrl),
    window.fetch(picUrl),
  ])
  let info = await results[0].json()
  let pic = await results[1].json()
  console.log(info, pic)
  return {
    info: info,
    pic: pic
  }
}

exports.createPages = async ({ actions: { createPage } }) => {
  const heroInfo = getRandomSuperhero()
  createPage({
    path: '/',
    component: require.resolve('./src/templates/hero-page.js'),
    context: heroInfo,
  })
}
