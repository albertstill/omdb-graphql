import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';
import Promise from 'bluebird';
import omdb from 'omdb';
Promise.promisifyAll(omdb);

var typeEnum = new GraphQLEnumType({
  name: 'Type',
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
  name: 'IMDb',
  description: 'IMDb specific fields',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The IMDb id of the movie'
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
  description: 'A movie',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the movie'
    },
    director: {
      type: GraphQLString,
      description: 'The director'
    },
    actors: {
      type: new GraphQLList(GraphQLString),
      description: 'Actors in the movie'
    },
    writers: {
      type: new GraphQLList(GraphQLString),
      description: 'Writers of the movie'
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
      description: 'A poster image'
    },
    type: {
      type: typeEnum,
      description: 'Wether its a movie, series or episode'
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
      resolve: (root, {title}) => { return omdb.getAsync({ title: 'Silicon Valley' }) }
    },
    movie: {
      type: movieType,
      args: {title: { name: 'title', type: new GraphQLNonNull(GraphQLString)}},
      resolve: (root, {title}) => {
        return omdb.getAsync(title).then(result => {
          console.log(result)
          return result
        });
      }
    }
  })
});

export var MovieSchema = new GraphQLSchema({
  query: queryType
});
