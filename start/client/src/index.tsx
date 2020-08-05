import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql, useQuery, NormalizedCacheObject} from '@apollo/client';
import React from "react"
import ReactDOM from "react-dom"
import Pages from "./pages"
import { typeDefs } from './resolvers';
import Login from './pages/login';
import { cache } from './cache';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Space Explorer [web]',
    'client-version': '1.0.0',
  },
  typeDefs,
  resolvers: {},
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN)
  return data.isLoggedIn ? <Pages /> : <Login />
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>, document.getElementById("root")
)