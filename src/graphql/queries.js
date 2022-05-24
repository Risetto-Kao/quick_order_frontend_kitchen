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
    customerName
    arrivedTime
    isTakeOut
  }
}
`;

export const QUERY_ITEMS = gql`
query Query($restaurantId: ID!) {
  itemAllLang(restaurantID: $restaurantId) {
    id
    name
    description
    price
    img
    type
    englishName
    englishDescription
    englishType
    comments {
      name
      content
      time
    }
  }
}`;
