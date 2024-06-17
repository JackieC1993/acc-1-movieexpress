const express = require("express")
const movies = express.Router();
const moviesArr = require("../data/movies")

// get a list of all of the movies
movies.get("/",  (req, res) =>{
    try {
        res.status(200).json(moviesArr)
    } catch (error) {
        res.status(404).json({error: error});
    }
})
// get one movie
movies.get("/:id", (req, res) => {
    try {
       const {id} = req.params 
       const movie = moviesArr.find((movie) => movie.id === Number(id))
       if(movie) {
        res.status(200).json(movie)
        } else {
            throw "could not find movie"
        }
    } catch (error) {
        res.status(404).json({error: error});
    }
})

// create one movie
movies.post("/", (request, response) => {
    try {
        const movie = request.body; //store the new anime data in the anime variable
        if (movie.id) { //if data exist add to animes array and send back successful response
            moviesArr.push(movie);
            response.status(201).json(moviesArr[moviesArr.length - 1]);
        } else { 
            throw "Could not create movie, please provide data";
        }
    } catch (error) {
        response.status(400).json({ error: error })
    }
})

movies.put("/:id", (req, res) => {
    try {
      const { id } = req.params; 
      const movie = req.body; 
      const index = moviesArr.findIndex((movie) => movie.id === Number(id)); 
      if (index !== -1) { 
        moviesArr.splice(index, 1, movie);
        res.status(201).json(moviesArr[index]); 
      } else { 
        throw "could not update movie"; 
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });

  movies.delete("/:id", (req, res) => {
    try {
      const {id} = req.params; 
      const index = moviesArr.findIndex(movie => movie.id === Number(id));
      if (index !== -1){ 
          moviesArr.splice(index, 1);
          res.status(200).json(moviesArr);
      } else { 
          throw "could not find movies"
      }
    } catch (error) {
      res.status(404).json({error: error});
    }
  });


  module.exports = movies;