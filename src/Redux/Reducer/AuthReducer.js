import * as Actions from "./../Actions";

const initialState = {
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  if (type === Actions.SAVE_USER) {
    return {
      ...state,
      user: payload,
    };
  }

  return state;
}
