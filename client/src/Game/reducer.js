import { CHANGE_STAGE, SEND_FORM } from "./actions";
import { GAME_STAGES } from "./mappings";

const initialState = {
  stage: GAME_STAGES.landing
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STAGE: {
      return {
        ...state,
        ...action.payload
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
