const path = require("path")
const express = require("express")
const rp = require("request-promise")
const requestProxy = require("express-request-proxy");

const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.config")

const app = express()
const publicPath = path.join(__dirname, "public")
const port = process.env.PORT || 9000

app.use(express.static(publicPath));
app.use(webpackMiddleware(webpack(webpackConfig)));



app.use('/api/lastfm/:method?',async (req, res)=>{
  const json = await rp({
    uri: "http://ws.audioscrobbler.com/2.0",
    json: true,
    qs: {
      api_key: process.env.LASTFM_API_KEY,
      method: req.params.method,
      format: 'json',
      ...req.query
    }
  });
  res.send(json);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
