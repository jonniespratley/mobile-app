'use strict';
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const graphql = require('graphql').graphql;
const request = require('request-promise');

const resolvers = require('./resolvers');
const typeDefs = require('./type-defs');
const createLoaders = require('./loaders');

function start(done, appPort) {
  const app = express();
  const port = appPort || 9000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // get the user token from the headers
      const authToken = req.headers.authorization || null;
      const zoneId = req.headers['Predix-Zone-Id'] || null;
      console.log('get context', context, token);

      const loaders = createLoaders(authToken, zoneId);
      // try to retrieve a user with the token
      //const user = getUser(token);
      const user = {};

      if (!token) throw new AuthenticationError('You must be logged in');

      // add the user to the context
      return { user, token, zoneId, loaders };
    },
  });
  server.applyMiddleware({ app, port, path: '/graphql' });
  /*
  app.get('/graphql', (req, res) => {
    const graphqlQuery = req.query.graphqlQuery;
    if (!graphqlQuery) {
      return res.status(500).send('You must provide a query');
    }
    
    return graphql(rootSchema, graphqlQuery)
      .then((response) => response.data)
      .then((data) => res.json(data))
      .catch((err) => console.error(err));
  });
  */
  return app.listen(port, (err) => {
    console.log(`🚀 Server ready at ${port}`);
    done();
  });
}

function stop(app, done) {
  app.close();
  done();
}

function graphqlQuery(app, query) {
  return request({
    baseUrl: `http://localhost:${app.address().port}`,
    uri: '/graphql',
    qs: {
      graphqlQuery: query,
    },
    resolveWithFullResponse: true,
    json: true,
  });
}

module.exports = {
  start,
  stop,
  graphqlQuery,
};
