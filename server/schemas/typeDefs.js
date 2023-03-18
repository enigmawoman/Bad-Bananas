const { gql } = require('apollo-server-express');

// describing within GraphQL what is available to be queried through  the interface
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    movieCount: Int
    savedMovies: [Movie]
  }

  type Movie {
    movieId: ID!
    rating: Float
    voteCount: Int
    description: String
    title: String!
    image: String
    link: String
    providers: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    movieId: Int!
    rating: Float
    voteCount: Int
    description: String!
    title: String!
    image: String
    link: String
    providers: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
    }
  
`;

module.exports = typeDefs;
