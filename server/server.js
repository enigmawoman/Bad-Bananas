const express = require('express');
// require the apollo server
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// reuiqre the auth middleware
const { authMiddleware } = require('./utils/auth');

// requireing the typDefs and resolvers from the schema files
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// defining the PORT to use
const PORT = process.env.PORT || 3001;
const app = express();
// settings for the  ApolloServer 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// defining where the appliaction build should be located in the file structure
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// Using the HTML template in the client build folder for the root build
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
