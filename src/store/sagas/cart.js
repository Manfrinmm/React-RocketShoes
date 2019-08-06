import { put, call, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../services/api";
import { formatPrice } from "../../util/formart";

import { addToCartSuccess, updateAmountSuccess } from "../ducks/cart/actions";

export function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const { data } = yield call(api.get, `/stock/${id}`);

  const stockAmount = data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error("Produto sem mais estoque!");
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    };

    yield put(addToCartSuccess(data));
  }
}

export function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const { data } = yield call(api.get, `/stock/${id}`);
  const stockAmount = data.amount;
  if (amount > stockAmount) {
    toast.error("Produto sem mais estoque!");
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}
