/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require(`node-fetch`);
const axios = require(`axios`);
const NASA_URL = "https://images-api.nasa.gov";
const ASSET = "PIA04921";
const ASSET_PATH = "/asset/" + ASSET;

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  try {
    /** Create Node for NASA image info **/
    const picResult = await axios.get(NASA_URL + ASSET_PATH);
    if (!picResult || !picResult.status === 200)
      throw "picResult status " + picResult.status;
    console.log(picResult.data);
    const picRef = picResult.data.collection.items.find(item =>
      item.href.includes("large.jpg")
    );
    const metaRef = picResult.data.collection.items.find(item =>
      item.href.includes("metadata.json")
    );

    const metaResult = await axios.get(metaRef.href);
    if (!metaResult || !metaResult.status === 200)
      throw "metaResult status " + metaResult.status;

    createNode({
      url: picRef.href,
      description: metaResult.data["XMP:Description"],
      id: ASSET,
      parent: null,
      children: [],
      internal: {
        type: "nasa",
        contentDigest: createContentDigest([
          picRef.href,
          metaResult.data["XMP:Description"]
        ])
      }
    });
  } catch (err) {
    console.log(err);
  }
};
