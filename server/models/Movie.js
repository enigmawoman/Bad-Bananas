const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMovies` array in User.js
const movieSchema = new Schema({
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  // saved movie id
  movieId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  providers:{
    type: String,
  }
});

module.exports = movieSchema;
