import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, errorInfo) {
    this.props.dispatch({
      type: "NAH_SERVER_RESPONSE",
      payload: {
        errors: ["Something went wrong"],
      },
    });
    localStorage.removeItem("app_state");
    console.log(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
