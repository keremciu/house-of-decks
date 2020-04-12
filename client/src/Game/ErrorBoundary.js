import React from "react";
import { localStorageKey } from "Store";
import { GAME_STAGES } from "./mappings";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, errorInfo) {
    localStorage.removeItem(localStorageKey);
    console.log(error, errorInfo);
    this.props.dispatch({
      type: "NAH_SERVER_RESPONSE",
      payload: {
        room: {
          stage: GAME_STAGES.landing,
        },
        errors: ["Something went wrong"],
      },
    });
  }

  render() {
    return this.props.children;
  }
}
