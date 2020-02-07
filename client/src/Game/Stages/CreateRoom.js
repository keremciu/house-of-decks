import React from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import socketClient from "socket.io-client";

// relative
import { StoreContext } from "Store";
import { changeStateAction, sendFormAction } from "Game/actions";
import validate from "utils/validate";

import Button from "Components/Button";
import Input from "Components/Input";
import { useState } from "react";

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

const initialValues = {
  username: ""
};

function CreateRoom() {
  const socket = socketClient();
  const [message, setMessage] = React.useState()
  const { dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    socket.on("message", data => setMessage(data))
  })

  function onSubmit(values, { setSubmitting, setErrors }) {
    const generatedRoomID = create_UUID();
    socket.emit("create_room", generatedRoomID);
    sendFormAction(values, dispatch);
    setSubmitting(false);
  }

  console.log('test', 'test', message)

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate(getValidationSchema)}
        onSubmit={onSubmit}
        render={CreateRoomForm}
      />
      {message}
      <button onClick={() => changeStateAction("join", dispatch)}>
        Go back
      </button>
    </>
  );
}

function CreateRoomForm(props) {
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
        type="username"
        onChange={handleChange}
      />
      <div className="form-field-error" style={{ height: 30, paddingTop: 20, marginBottom: 10 }}>
        {errors.username}
      </div>
      <Button onClick={handleSubmit}>
        {isSubmitting ? "Starting a room..." : "Start a room" }
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

export default CreateRoom;
