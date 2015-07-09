import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';
import Promise from 'bluebird';
import omdb from 'omdb';
Promise.promisifyAll(omdb);

var typeEnum = new GraphQLEnumType({
  name: 'MovieType',
  description: 'A movie, series, or and episode',
  values: {
    MOVIE: {
      value: 'movie',
      description: 'a cinema film'
    },
    SERIES: {
      value: 'series',
      description: 'a set or sequence of related television programmes'
    },
    EPISODE: {
      value: 'episode',
      description: 'each of the separate instalments into which a television programme is divided'
    },
  }
});

var imdbType = new GraphQLObjectType({
  name: 'Imdb',
  description: 'IMDb specific fields',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'IMDb id'
    },
    rating: {
      type: GraphQLFloat,
      description: 'IMDb rating'
    },
    votes: {
      type: GraphQLInt,
      description: 'IMDb votes'
    }
  })
});

var movieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'A movie, series or episode',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title'
    },
    director: {
      type: GraphQLString,
      description: 'The director'
    },
    actors: {
      type: new GraphQLList(GraphQLString),
      description: 'List of starring actors'
    },
    writers: {
      type: new GraphQLList(GraphQLString),
      description: 'List of the writers'
    },
    released: {
      type: GraphQLString,
      description: 'Release date'
    },
    plot: {
      type: GraphQLString,
      description: 'The plot'
    },
    awards: {
      type: GraphQLString,
      description: 'The awards'
    },
    poster: {
      type: GraphQLString,
      description: 'A poster image URL'
    },
    type: {
      type: typeEnum,
      description: 'Whether its a movie, series or episode'
    },
    imdb: {
      type: imdbType,
      description: 'IMDb specific fields'
    }
  })
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    funniestSeriesEver: {
      type: movieType,
      description: "Alberts favourite TV series. What's got two thumbs and 3 commas?",
      resolve: () => omdb.getAsync({ imdb: 'tt2575988' })
    },
    movie: {
      type: movieType,
      description: 'Find a movie, series or epidsode by its title',
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, {title}) => {
        return omdb.getAsync(title);
      }
    }
  })
});

export var MovieSchema = new GraphQLSchema({
  query: queryType
});
