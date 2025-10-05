import { gql } from "@apollo/client";

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
    }
  }
`;

export const GET_ALL_RESTAURANTS = gql`
  query GetAllRestaurants {
    restaurants {
      name
      image
      city
      state
      address
      phone
      email
    }
  }
`;

export const GET_RESTAURANT_WITH_FOOD_ITEMS = gql`
  query GetRestaurant($id: String!) {
    restaurant(id: $id) {
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
        image
        category
        type
      }
    }
  }
`;

export const GET_RESTAURANT_BY_NAME_WITH_FOOD_ITEMS = gql`
  query GetRestaurantByName($name: String!) {
    restaurantByName(name: $name) {
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
        image
        category
        type
      }
    }
  }
`;

export const GET_RECOMMENDED_ITEMS = gql`
  query GetRecommendedItems {
    recommendedItems {
      _id
      name
      price
      image
      category
      type
      restaurant {
        _id
        name
        image
        city
        state
        address
      }
    }
  }
`;
