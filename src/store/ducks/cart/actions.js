import { Types } from "./reducer";

export function addToCartRequest(id) {
  return {
    type: Types.REQUEST,
    id
  };
}

export function addToCartSuccess(product) {
  return {
    type: Types.ADD,
    product
  };
}

export function removeFromCart(id) {
  return {
    type: Types.REMOVE,
    id
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: Types.UPDATEAMOUNT_REQUEST,
    id,
    amount
  };
}
export function updateAmountSuccess(id, amount) {
  return {
    type: Types.UPDATEAMOUNT_SUCCESS,
    id,
    amount
  };
}
