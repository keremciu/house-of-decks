import { CHANGE_STAGE, SEND_FORM, SERVER_RESPONSE } from "./actions";
import { GAME_STAGES } from "./mappings";

const initialState = {
  room: {
    stage: GAME_STAGES.landing,
  },
  isNudgeReady: true,
  errors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STAGE: {
      return {
        ...state,
        room: {
          ...state.room,
          stage: action.payload,
        },
        errors: [],
      };
    }

    case SERVER_RESPONSE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SEND_FORM: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
