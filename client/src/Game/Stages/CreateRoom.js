import React, { useContext, useState, useRef } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { motion } from "framer-motion";

// relative
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction, sendFormAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";
import validate from "utils/validate";

import Button, { BackIcon } from "Components/Button";
import Input, { Form } from "Components/Input";

const initialValues = {
  username: "",
};

function CreateRoom() {
  const {
    state: {
      game: { errors },
    },
    dispatch,
  } = useContext(StoreContext);
  const socket = useContext(SocketContext);
  function onSubmit(values, test) {
    socket.emit("create_room", {
      username: values.username,
    });
    dispatch(sendFormAction(values));
  }

  function setErrors(errors) {
    dispatch(sendFormAction({ errors }));
  }

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validate={validate(getValidationSchema, errors, setErrors)}
        onSubmit={onSubmit}
      >
        {CreateRoomForm}
      </Formik>
      <Button
        small
        onClick={() => dispatch(changeStageAction(GAME_STAGES.landing))}
      >
        {BackIcon}
      </Button>
    </>
  );
}

function CreateRoomForm(props) {
  const {
    isSubmitting,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Your username"
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} type="submit">
        {isSubmitting ? "Starting a room..." : "Start a room"}
      </Button>
    </Form>
  );
}

function getValidationSchema(values) {
  return object().shape({
    username: string()
      .min(3, `Username has to be longer than ${3} characters!`)
      .max(10, `Username can't be longer than ${10} characters!`)
      .required("Username is required!"),
  });
}

export default CreateRoom;
