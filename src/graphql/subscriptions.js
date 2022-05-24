import { gql } from '@apollo/client';

// TODO: check the official gql syntax
export const SUBSCRIPTION_ORDER = gql`
subscription Subscription($restaurantId: String!) {
  order(restaurantId: $restaurantId) {
    id
    tableNo
    items {
      id
      name
      orderItemInfo {
        quantity
        note
        state
      }
    }
    totalPrice
    time
  }
}
`;
