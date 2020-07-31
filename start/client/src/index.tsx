import gql from "graphql-tag"
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import React from "react"
import ReactDOM from "react-dom"
import Pages from "./pages"

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
  cache,
  link,
});

client.query({
  query: gql`
    query GetLaunch {
      launch(id: 56) {
        id
        mission {
          name
        }
      }
    }
  `
})
.then(result => console.log(result))

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById("root")
)