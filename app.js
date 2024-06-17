const express = require("express");
const app = express()
const moviesController = require("./controllers/movies")

app.use(express.json())

app.use("/movies", moviesController)

app.get("/", (_,response)=> {
 response.send("Welcome to the Great Movies");
});

app.get("*", (_, res) =>{
    res.status(404).send("Page not found");
})
module.exports = app