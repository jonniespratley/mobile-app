const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
module.exports = gql`
  

  # The current session user
  type User {
    id: String
    name: String
    email: String
    picture: String
    firstName: String
    lastName: String
  }

  type Playlist{

  }

  type Attr { 
    page: String
    perPage: String
    totalPages: String
    total: String 
  }

  type Image { 
    text: String 
    size: String 
  }
  type Image { text: String size: String }



type Streamable { text: String fulltrack: String }

type Track { 
  name: String
  duration: String
  playcount: String
  listeners: String
  mbid: String
  url: String
  image: [Image ]
  artist: Artist
  streamable: Streamable 
  }

type Artist { 
  name: String
  playcount: String
  listeners: String
  mbid: String
  url: String
  streamable: String
  image: [Image ] 
  }

type Artists { attr: Attr artist: [Artist ] }

  type Query {
    user: User
    hello: String
    songs: [Track]
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`;
