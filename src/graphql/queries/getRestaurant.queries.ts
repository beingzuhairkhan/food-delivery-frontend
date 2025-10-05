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
