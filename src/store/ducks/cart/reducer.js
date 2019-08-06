import produce from "immer";

export const Types = {
  REQUEST: "@cart/REQUEST",
  ADD: "@cart/ADD_SUCCESS",
  REMOVE: "@cart/REMOVE",
  UPDATEAMOUNT_REQUEST: "@cart/UPDATEAMOUNT_REQUEST",
  UPDATEAMOUNT_SUCCESS: "@cart/UPDATE_AMOUNT_SUCCESS"
};

export default function cart(state = [], action) {
  switch (action.type) {
    case Types.ADD:
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });

    case Types.REMOVE:
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case Types.UPDATEAMOUNT_SUCCESS: {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }

    default:
      return state;
  }
}
