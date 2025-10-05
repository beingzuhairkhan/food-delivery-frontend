import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

// Create auth link
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// GraphQL queries
export const GET_MY_RESTAURANT = gql`
  query GetMyRestaurant {
    myRestaurant {
      name
      image
      city
      state
      address
      phone
      email
      foodItems {
        name
        price
        type
        category
        image
      }
    }
  }
`;

// Service functions
export const getMyRestaurant = async () => {
  try {
    const { data } = await client.query({
      query: GET_MY_RESTAURANT,
      fetchPolicy: 'no-cache',
      errorPolicy: 'none',
    });
    return (data as any).myRestaurant;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw error;
  }
};

export default client;