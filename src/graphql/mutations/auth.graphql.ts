import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      token
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

// Add this new mutation
export const REGISTER_USER = gql`
  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    register(registerInput: { firstName: $firstName, lastName: $lastName, email: $email, password: $password }) {
      token
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;