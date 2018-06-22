require('dotenv').config();

const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  axios = require('axios'),
  PORT = 3000

//   Builds an object that can make HTTP requests:
const apiClient = axios.create()

app.get("/", (req, res) => {
  console.log("REQUEST RECEIVED, CONTACTING NASA")
  const apiUrl = 'http://api.open-notify.org/iss-now.json'
  apiClient({ method: "get", url: apiUrl }).then((dataThatCameBack) => {
    res.json(dataThatCameBack.data.iss_position)
  })
})

app.get("/random", (req, res) => {
    const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=PG-13`
    apiClient({ method: "get", url: apiUrl }).then((apiResponse) => {
        const imageUrl = apiResponse.data.data.image_original_url
        res.send(`<img src="${imageUrl}"> `)
    })
})

app.get("/search/:term", (req, res) => {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${req.params.term}&limit=25&offset=0&rating=G&lang=en`
    apiClient({ method: "get", url: apiUrl }).then((apiResponse) => {
        // const imageUrl = apiResponse.data.data.images.original.url
        let results = ''
        apiResponse.data.data.forEach((r) => {
            let imgUrl = r.images.original.url
            results += `<img src="${imgUrl}">`
        })
        res.send(results)
    })

})



app.listen(PORT, (err) => {
  console.log(err || `Server running on ${PORT}.`)
})