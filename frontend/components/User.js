import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      # how we handle union types in graphql
      ... on User {
        id
        email
        name
        # TODO: query cart
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
