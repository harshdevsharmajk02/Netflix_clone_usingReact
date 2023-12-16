import { Box, CardMedia, Grid, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {doc, setDoc} from 'firebase/firestore'
import { database } from "../firebase/setup";

function Home() {

  const [movies, setMovies] = useState([]);


  const getMovie = () => {
    try {
      fetch("https://api.themoviedb.org/3/discover/movie?api_key=6a779e2f0dc326f0cbb66a0b937fef9e")
        .then(res => res.json())
        .then(json => setMovies(json.results))
    }
    catch (err) {
      console.err(err)
    }
  }


  useEffect(() => {
    getMovie()
  }, [])

  const addMovie =  async(movie)=>{
   
    const movieRef = doc(database, "Movies", `${movie.id}`)
    try {
      await setDoc(movieRef,{
        movieName:movie.original_title
      })
     
    } 
    catch (err) {
      console.error(err)
    }
  
  }

  return (
    <>
      <div style={{ background: "black" }}>
        <Grid container spacing={2} style={{ paddingTop: "40px", paddingRight: "20px", paddingLeft: "20px" }}>
          {
            movies.map((movie) => {
              {addMovie(movie)}
              return <Grid xs="3" style={{ paddingLeft: "20px", paddingTop: "20px", paddingRight: "20px" }}>
                <Box>
              <Link to="/moviedetail">
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`} >

                    </CardMedia>

                  </Card>
                  </Link>
                  </Box>
              </Grid>
            })
          }
        </Grid>
      </div>

    </>
  )
}

export default Home;