import * as Actions from "./../Actions";

const initialState = {
  shoesDetail: {
    returnable: false,
    expiry: 30,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  if (type === Actions.SAVE_SHOE_SIZE) {
    return {
      ...state,
      shoesDetail: {
        ...state.shoesDetail,
        ...payload,
      },
    };
  }

  if (type === Actions.SAVE_DAYS) {
    return {
      ...state,
      shoesDetail: {
        ...state.shoesDetail,
        expiry: payload,
      },
    };
  }

  if (type === Actions.SAVE_RETURNABLE) {
    ////console.log(payload);
    return {
      ...state,
      shoesDetail: {
        ...state.shoesDetail,
        returnable: payload,
      },
    };
  }

  if (type === Actions.SAVE_CHARGES) {
    ////console.log(payload);
    return {
      ...state,
      shoesDetail: {
        ...state.shoesDetail,
        ...payload,
      },
    };
  }

  return state;
}
