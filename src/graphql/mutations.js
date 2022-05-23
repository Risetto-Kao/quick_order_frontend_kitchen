import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
mutation CreateOrder($order: inputOrder) {
  createOrder(order: $order)
}
`;

export const CREATE_ITEM = gql`
mutation Mutation($data: CreateItemInput!, $file:Upload) {
  createItem(data: $data, file: $file) {
    id
    name
    description
    img
    price
  }
}
`;

export const UPDATE_ITEM = gql`
mutation Mutation($updateItemId: String!, $data: UpdateItemInput!, $file: Upload) {
  updateItem(id: $updateItemId, data: $data, file: $file) {
    id
    name
    price
    description
  }
}
`;

export const DELETE_ITEM = gql`
mutation DeleteItem($deleteItemId: String!) {
  deleteItem(id: $deleteItemId) {
    id
    name
    description
  }
}
`;

export const UPLOAD_FILE = gql`
    mutation singleUpload($file: Upload!){
        singleUpload(file: $file){
            url
        }
    }
`;

export const UPDATE_STATE = gql`
mutation UpdateOrderItemState($orderId: String!, $itemId: String!, $state: String!) {
  updateOrderItemState(orderId: $orderId, itemId: $itemId, state: $state)
}
`;