# omdb-graphql
A GraphQL bridge for http://www.omdbapi.com/. I wrote this app for my [blog](http://red-badger.com/blog/2015/07/09/graphql-and-the-open-movie-database-from-introspection-to-inception/).

## Run a query against this app on Heroku
Send `POST` requests to `https://omdb-graphql.herokuapp.com` with a raw GraphQL query in the body. I suggest using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

Example query:

```javascript
query getWesAndersonsBest {
    movie(title: "Fantastic Mr. Fox") {
        title
        director
        writers
        actors
        released
        plot
        poster
        type
        imdb {
          id
          rating
          votes
        }
    }
}
```
the response:

```json
{
  "data": {
    "movie": {
      "title": "Fantastic Mr. Fox",
      "director": "Wes Anderson",
      "writers": [
        "Roald Dahl (novel)",
        "Wes Anderson (screenplay)",
        "Noah Baumbach (screenplay)"
      ],
      "actors": [
        "George Clooney",
        "Meryl Streep",
        "Jason Schwartzman",
        "Bill Murray"
      ],
      "released": "Wed Nov 25 2009 00:00:00 GMT+0000 (GMT)",
      "plot": "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
      "poster": "http://ia.media-imdb.com/images/M/MV5BMTcwODE2NTI3Nl5BMl5BanBnXkFtZTcwMjUwOTY5Mg@@._V1_SX300.jpg",
      "type": "MOVIE",
      "imdb": {
        "id": "tt0432283",
        "rating": 7.8,
        "votes": 120227
      }
    }
  }
}
```

# Run locally
`npm install`

`npm start`

Send `POST` requests to localhost:8080
