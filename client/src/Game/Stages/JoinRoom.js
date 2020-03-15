import React, { useContext } from "react";
import { Formik } from "formik";
import { string, object } from "yup";

// relative
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStateAction, sendFormAction } from "Game/actions";
import validate from "utils/validate";

import Button from "Components/Button";
import Input from "Components/Input";

const initialValues = {
  username: "",
  roomID: ""
};

function JoinRoom() {
  const { dispatch } = React.useContext(StoreContext);
  const socket = useContext(SocketContext);
  function onSubmit(values, { setSubmitting, setErrors }) {
    socket.emit("join_room", values.roomID);
    sendFormAction(values, dispatch);
    setSubmitting(false);
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate(getValidationSchema)}
        onSubmit={onSubmit}
      >
        {JoinRoomForm}
      </Formik>
      <Button small onClick={() => changeStateAction("join", dispatch)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </Button>
    </>
  );
}

function JoinRoomForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit } = props;

  return (
    <div
      className="form"
      style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Input
        errors={errors.username}
        label="Your first name"
        name="username"
        onChange={handleChange}
      />
      <Input
        errors={errors.username}
        label="Room ID"
        name="roomID"
        onChange={handleChange}
      />
      <div
        className="form-field-error"
        style={{ height: 30, paddingTop: 20, marginBottom: 10 }}
      >
        {errors.username}
      </div>
      <Button onClick={handleSubmit} type="submit">
        {isSubmitting ? "Joining the room..." : "Join the room"}
      </Button>
    </div>
  );
}

function getValidationSchema(values) {
  return object().shape({
    username: string()
      .min(3, `Username has to be longer than ${3} characters!`)
      .required("Username is required!")
  });
}

export default JoinRoom;
