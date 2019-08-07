const { ApolloServer } = require('apollo-server-express');

// The root provides a resolver function for each API endpoint
const resolvers = require('./resolvers');
const typeDefs = require('./type-defs');
const createLoaders = require('./loaders');

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
};

const loaderCache = new Map();

const context = ({ req }) => {
  const authToken = req.get('authorization');
  if (!authToken) {
    //throw new AuthenticationError('You must provide an Authorization header!');
  }

  //console.log('get context', context, zoneId);
  const hasLoaders = loaderCache.has(authToken);
  const loaders = hasLoaders ? loaderCache.get(authToken) : createLoaders(authToken);

  if (!hasLoaders) {
    loaderCache.set(authToken, loaders);
  }

  return { authToken, loaders };
};

module.exports = function(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // mocks,
    context,
  });
  server.applyMiddleware({ app, path: '/graphql' });
};
