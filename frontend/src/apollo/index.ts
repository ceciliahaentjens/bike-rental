// Création du client Apollo
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_OSCAR_API_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Export
export default client;