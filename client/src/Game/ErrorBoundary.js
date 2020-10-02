import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, errorInfo) {
    // localStorage.removeItem(localStorageKey);
    console.log(error, errorInfo);
    // something went wrong part
    // this.props.dispatch({
    //   type: "NAH_SERVER_RESPONSE",
    //   payload: {
    //     room: {
    //       stage: GAME_STAGES.landing,
    //     },
    //     errors: ["Something went wrong"],
    //   },
    // });
  }

  render() {
    return this.props.children;
  }
}
