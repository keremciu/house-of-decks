import React, { useEffect, useContext, useRef } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
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
  const { sendServer, errors, setErrors } = useContext(SocketContext);

  function onSubmit(values, test) {
    sendServer({
      action: "create",
      payload: {
        username: values.username,
      },
    });
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
  const { isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

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
      <Button type="submit">
        {isSubmitting ? "Starting a game..." : "Start a game"}
      </Button>
    </Form>
  );
}

function getValidationSchema(values) {
  return object().shape({
    username: string()
      .min(3)
      .max(10)
      .required(),
  });
}

export default CreateRoom;
