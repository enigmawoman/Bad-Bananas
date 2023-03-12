 // these resolvers are replacing the original contollers and routes for the RESTful API model
// require the apollo server and JWT sign in tokens and the USER model
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// query resolvers
const resolvers = {
    Query: {
        // query resolvers for single user
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    _id: context.user._id
                  });
                  return foundUser;
                }
            throw new AuthenticationError('You need to be logged in!');   
        }
    },

    // mutation resolvers
    Mutation: {
        // mutation resolvers for login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          // mutation resolvers for new user 
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        // mutation resolvers for saving a movie based on the logged in user
        saveMovie: async (parent, { movieData }, context) => {
            console.log(movieData, "movie data on the ");
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedMovies: movieData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
         }
         throw new AuthenticationError('You need to be logged in!');
        },
        // mutation resolvers for removing a movie based on the logged in user
        removeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedMovies: { movieId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
}

module.exports = resolvers;