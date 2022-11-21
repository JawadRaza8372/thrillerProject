import * as Actions from "../Actions";
const initialState = {
  buyShoe: {
    id: null,
    offer: true,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  if (type === Actions.SET_SIZE) {
    return {
      ...state,
      buyShoe: {
        ...state.buyShoe,
        size: payload,
      },
    };
  }

  if (type === Actions.SET_SHOE_ID) {
    return {
      ...state,
      buyShoe: {
        ...state.buyShoe,
        id: payload,
      },
    };
  }

  if (type === Actions.SET_SHOE_AMMOUNT_DETAILS) {
    return {
      ...state,
      buyShoe: {
        ...state.buyShoe,
        ...payload,
      },
    };
  }

  if (type === Actions.SET_OFFER_ORDER) {
    return {
      ...state,
      buyShoe: {
        ...state.buyShoe,
        offer: payload,
      },
    };
  }

  if (type === Actions.SET_OFFER_AMMOUNT) {
    return {
      ...state,
      buyShoe: {
        ...state.buyShoe,
        offerAmmount: "",
      },
    };
  }
  return state;
}
