import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { split } from "apollo-client-preset";
import { HttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
let auth;
export const updateAuth = (newAuth) => {
  auth = newAuth;
};

const httpLink = new HttpLink({
  uri: "http://localhost:9000/graphql"
});
  

const authLink = setContext(async (_, { headers } ) => {
  const token = await auth.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:9000/graphql`,
  options: {
  reconnect: true
  }
});

const link = split(
  ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink),
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
