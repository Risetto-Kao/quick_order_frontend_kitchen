import { gql } from '@apollo/client';

export const QUERY_ORDERS = gql`
query TodayOrders($restaurantId: ID!) {
  todayOrders(restaurantID: $restaurantId) {
    items {
      id
      name
      price
      orderItemInfo {
        quantity
        note
      }
    }
    tableNo
    totalPrice
    time
    id
  }
}
`;

export const QUERY_ITEMS = gql`
query Items($restaurantId: ID!) {
  items(restaurantID: $restaurantId) {
    id
    name
    description
    price
    img
    comments {
      name
      content
      time
    }
  }
}`;
