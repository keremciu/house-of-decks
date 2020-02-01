export const CHANGE_STAGE = "NAH_CHANGE_STAGE";
export const changeStateAction = (payload, dispatch) => {
  return dispatch({
    type: CHANGE_STAGE,
    payload
  });
};
export const SEND_FORM = "NAH_SEND_FORM";
export const sendFormAction = (payload, dispatch) => {
  return dispatch({
    type: SEND_FORM,
    payload
  });
};
