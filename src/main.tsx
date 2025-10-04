import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
// Import MockedProvider
import { MockedProvider } from '@apollo/client/testing/react'; 
import { LOGIN_USER , REGISTER_USER} from './graphql/mutations/auth.graphql.ts';
import { GET_MENU_ITEMS } from './graphql/queries/menu.graphql.ts';
// import { request } from 'http';
// import { PassThrough } from 'stream';
// import { register } from 'module';

// 1. Define the mock menu items data (reusable)
const mockMenuItems = [
  {
    id: '1',
    name: 'Corn Pizza',
    description: 'Delicious pizza topped with sweet corn and cheese',
    price: 199.00,
    category: 'PIZZA',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '2',
    name: 'Chicken Burger',
    description: 'Juicy chicken burger with fresh lettuce and tomatoes',
    price: 99.00,
    category: 'BURGER',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '3',
    name: 'Veg Burger',
    description: 'Healthy vegetarian burger with fresh veggies',
    price: 99.00,
    category: 'BURGER',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '4',
    name: 'Samosa (2 pieces)',
    description: 'Crispy samosas filled with spiced potatoes',
    price: 49.00,
    category: 'SNACKS',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '5',
    name: 'Paneer Roll',
    description: 'Soft roll filled with spicy paneer and vegetables',
    price: 129.00,
    category: 'ROLLS',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '6',
    name: 'Chicken Tandoori',
    description: 'Tandoori chicken marinated in yogurt and spices',
    price: 249.00,
    category: 'MAIN_COURSE',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '7',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella and basil',
    price: 179.00,
    category: 'PIZZA',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
    __typename: 'MenuItem',
  },
  {
    id: '8',
    name: 'Fish Curry',
    description: 'Spicy fish curry with coconut milk and spices',
    price: 299.00,
    category: 'MAIN_COURSE',
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: false,
    __typename: 'MenuItem',
  }
];

// 2. Define the mock responses with multiple entries for the same query
const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: 'test@example.com',
        password: 'password123',
      },
    },
    result: {
      data: {
        login: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'Zuhair',
            lastName: 'Khan',
            role: 'CUSTOMER',
          },
        },
      },
    },
  },
  {
    request:{
      query: REGISTER_USER,
      variables:{
        firstName: "New",
        lastName: "User",
        email: 'newuser@example.com',
        password: 'newpassword123',
      }
    },
    result:{
      data:{
        register:{
          token: 'new-mock-jwt-token',
          user:{
            id: '2',
            email:'newuser@example.com',
            firstName: 'New',
            lastName: 'User',
            role: 'CUSTOMER',
          }
        }
      }
    }
  },
  // Multiple identical mocks for GET_MENU_ITEMS to handle multiple calls
  {
    request: {
      query: GET_MENU_ITEMS,
    },
    result: {
      data: {
        menuItems: mockMenuItems
      }
    }
  },
  {
    request: {
      query: GET_MENU_ITEMS,
    },
    result: {
      data: {
        menuItems: mockMenuItems
      }
    }
  },
  {
    request: {
      query: GET_MENU_ITEMS,
    },
    result: {
      data: {
        menuItems: mockMenuItems
      }
    }
  },
  {
    request: {
      query: GET_MENU_ITEMS,
    },
    result: {
      data: {
        menuItems: mockMenuItems
      }
    }
  },
  {
    request: {
      query: GET_MENU_ITEMS,
    },
    result: {
      data: {
        menuItems: mockMenuItems
      }
    }
  }
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Use MockedProvider instead of ApolloProvider */}
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    </BrowserRouter>
  </StrictMode>
);