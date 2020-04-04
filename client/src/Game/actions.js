export const CHANGE_STAGE = "NAH_CHANGE_STAGE";
export const changeStageAction = payload => {
  return {
    type: CHANGE_STAGE,
    payload
  };
};

export const SEND_FORM = "NAH_SEND_FORM";
export const sendFormAction = payload => {
  return {
    type: SEND_FORM,
    payload
  };
};

export const SERVER_RESPONSE = "NAH_SERVER_RESPONSE";
