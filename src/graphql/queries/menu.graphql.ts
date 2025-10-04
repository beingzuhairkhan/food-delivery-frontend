import { gql } from "@apollo/client";

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menuItems {
      id
      name
      description
      price
      category
      imageUrl
      isVegetarian
      isVegan
      isGlutenFree
      isAvailable
    }
  }
`;