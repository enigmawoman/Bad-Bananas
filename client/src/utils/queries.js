import { gql } from '@apollo/client';

// creating the front end gql queries for database queries
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      movieCount
      savedMovies {
        movieId
        rating
        voteCount
        description
        title
        image
        link
      }
    }
  }
`;
