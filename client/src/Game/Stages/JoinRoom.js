import React, { useContext } from "react";
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
          roomID: gameid,
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

  return (
    <Form onSubmit={handleSubmit}>
      <Input
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
      .min(3, `Username has to be longer than ${3} characters!`)
      .max(10, `Username can't be longer than ${10} characters!`)
      .required("Username is required!"),
    roomID: string()
      .min(3, `Room ID has to be longer than ${3} characters!`)
      .required("Room ID is required!"),
  });
}

export default JoinRoom;
