import restify from 'restify';
import { graphql } from 'graphql';
import { MovieSchema } from './movieSchema.js';

var server = restify.createServer({
  name: 'omdb-graphql'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', (req, res, next) => {
  var app_details = {
    author: 'https://github.com/albertstill',
    repo: 'https://github.com/albertstill/omdb-graphql',
    blog: 'http://red-badger.com/blog/2015/07/09/graphql-and-the-open-movie-database-from-introspection-to-inception/'
  }

  res.send(app_details)
});

server.post('/', (req, res, next) => {
  graphql(MovieSchema, req.body).then((result) => {
    res.send(result)
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
