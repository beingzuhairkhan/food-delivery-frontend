import { gql } from "@apollo/client";

export const GET_OWNER_RESTAURANT = gql`
  query GetOwnerRestaurant($ownerId: ID!) {
    restaurantByOwner(ownerId: $ownerId) {
      _id
      name
      image
      city
      state
      address
      phone
      email
      foodItems {
        _id
        name
        price
        type
        category
        image
      }
    }
  }
`;
