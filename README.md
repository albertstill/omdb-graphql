# omdb-graphql
A GraphQL adapter for http://www.omdbapi.com/

# Run a query on the Heroku server
Send `POST` requests to `https://omdb-graphql.herokuapp.com` with a raw GraphQL query in the body. I suggest using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

Example query:

```
query getMeAMovie {
    movie(title: "True Romance") {
        title
        actors
        released
        type
        plot
        poster
        director
    }
}
```

# Run locally
`npm install`

`npm start`

Send `POST` requests to localhost:8080
