import { CHANGE_STAGE, SEND_FORM } from "./actions";

const initialState = {
  stage: "join"
};

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

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
