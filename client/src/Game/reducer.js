import { CHANGE_STAGE, SEND_FORM } from "./actions";

const initialState = {
  stage: "join"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STAGE: {
      return {
        ...state,
        stage: action.payload
      };
    }

    case SEND_FORM: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}
