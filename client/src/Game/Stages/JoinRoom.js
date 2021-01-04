import React, { useContext, useEffect, useRef } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { useParams, useNavigate } from "react-router-dom";

// relative
import SocketContext from "SocketContext";
import validate from "utils/validate";

import Button, { BackIcon } from "Components/Button";
import Input, { Form } from "Components/Input";

const initialValues = {
  username: "",
  roomID: "",
};

function JoinRoom() {
  const { sendServer, errors, setErrors } = useContext(SocketContext);
  const navigate = useNavigate();
  const { gameid } = useParams();

  function onSubmit(values, { setSubmitting, setErrors }) {
    sendServer({
      action: "join",
      payload: values,
    });
    setSubmitting(false);
  }

  function onLeave() {
    navigate("/");
  }

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          ...initialValues,
          roomID: gameid || "",
        }}
        validate={validate(getValidationSchema, errors, setErrors)}
        onSubmit={onSubmit}
      >
        {JoinRoomForm}
      </Formik>
      <Button
        small
        onClick={onLeave}
        wrapperStyle={{ paddingBottom: 16, marginTop: "auto" }}
      >
        {BackIcon}
      </Button>
    </>
  );
}

function JoinRoomForm(props) {
  const {
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
  } = props;

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
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Input
        label="Room ID"
        name="roomID"
        maxLength={12}
        autoComplete={"off"}
        value={values.roomID}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Button type="submit">
        {isSubmitting ? "Joining the room..." : "Join the game"}
      </Button>
    </Form>
  );
}

function getValidationSchema(values) {
  return object().shape({
    username: string()
      .label("Username")
      .min(3)
      .max(10)
      .required(),
    roomID: string()
      .label("Room ID")
      .min(3)
      .required(),
  });
}

export default JoinRoom;
