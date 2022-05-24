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
        state
      }
    }
    tableNo
    totalPrice
    time
    id
  }
}
`;

// 因為這邊沒拿到english的東西，所以我後面直接設定的時候就出狀況
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
