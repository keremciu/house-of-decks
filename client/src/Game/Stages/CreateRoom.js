import React, { useEffect, useContext, useState, useRef } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// relative
import SocketContext from "SocketContext";
import validate from "utils/validate";

import Button, { BackIcon } from "Components/Button";
import Input, { Form } from "Components/Input";

const initialValues = {
  username: "",
};

function CreateRoom() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const errors = [];

  function onSubmit(values, test) {
    socket.sendServer({
      action: "create_room",
      payload: {
        username: values.username,
      },
    });
  }

  function setErrors(errors) {
    // catch errors
    console.log(errors);
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
        onClick={() => navigate("/")}
        wrapperStyle={{ paddingBottom: 16, marginTop: "auto" }}
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

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        label="Username"
        name="username"
        maxLength={10}
        autoComplete={"off"}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} type="submit">
        {isSubmitting ? "Starting a game..." : "Start a game"}
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
