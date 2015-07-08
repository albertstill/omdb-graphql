import restify from 'restify';
import { graphql } from 'graphql';
import { MovieSchema } from './movieSchema.js';

var server = restify.createServer({
  name: 'omdb-graphql'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/graphql', (req, res, next) => {
  graphql(MovieSchema, req.body).then((result) => {
    res.send(result)
  });
  return next();
});

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
