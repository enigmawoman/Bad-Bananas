import React from 'react'
import { Rating } from "@mui/material" 
import { GiBananaPeeled, GiBanana } from "react-icons/gi";

function FilmRating({movieId, movieRating}) {
  return (
    <div>
        <Rating icon={<GiBananaPeeled/>} emptyIcon={<GiBanana/>} defaultValue={movieRating} max={10} precision={0.5}>
       
        </Rating>
    </div>
  
  )
}

export default FilmRating