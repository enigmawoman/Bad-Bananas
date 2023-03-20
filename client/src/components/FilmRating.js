import React from 'react'
import { Rating } from "@mui/material" 
import { GiBananaPeeled, GiBanana } from "react-icons/gi";

// the film rating  component uses the material ui component for rating to display the film rating using custom icons - the rating is read only

function FilmRating({movieId, movieRating}) {
  return (
    <div>
        <Rating name="read-only" icon={<GiBananaPeeled/>} emptyIcon={<GiBanana/>} defaultValue={movieRating} max={10} precision={0.5} readOnly />
        
    </div>
  
  )
}

export default FilmRating