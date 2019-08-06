import { all, takeLatest } from "redux-saga/effects";
import { Types } from "../ducks/cart/reducer";
import { addToCart, updateAmount } from "./cart";

export default function* rootSaga() {
  yield all([
    takeLatest(Types.REQUEST, addToCart),
    takeLatest(Types.UPDATEAMOUNT_REQUEST, updateAmount)
  ]);
}
