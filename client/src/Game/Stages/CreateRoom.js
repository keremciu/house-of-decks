import React, { useContext, useState, useRef } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { motion } from "framer-motion";
import usePortal from "react-cool-portal";

// relative
import SocketContext from "SocketContext";
import { StoreContext } from "Store";
import { changeStageAction, sendFormAction } from "Game/actions";
import { GAME_STAGES } from "Game/mappings";
import validate from "utils/validate";

import Button, { BackIcon } from "Components/Button";
import Input, { Form } from "Components/Input";
import DeckSelect from "Components/DeckSelect";

const initialValues = {
  username: "",
  decks: {
    base: true,
  },
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
    const decks = Object.keys(values.decks).filter(
      (deck) => values.decks[deck]
    );
    socket.emit("create_room", {
      username: values.username,
      decks,
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
        wrapperStyle={{ marginTop: "auto" }}
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
  const { Portal, show, hide } = usePortal({
    defaultShow: false,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Your username"
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Portal style={{ width: "100%" }}>
        <DeckSelect handleClose={hide} />
      </Portal>
      <Button secondary onClick={show} wrapperStyle={{ paddingBottom: 0 }}>
        Customize Cards ►
      </Button>
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
