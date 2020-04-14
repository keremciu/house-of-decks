import React from "react";
import ReactDOM from "react-dom";
import * as io from "socket.io-client";

import "./index.css";
import { StoreProvider } from "./Store";
import SocketContext from "./SocketContext";
import { Container as GameContainer } from "./Game";

const socket = io({ transports: ["websocket"], upgrade: false });

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <StoreProvider>
      <GameContainer />
    </StoreProvider>
  </SocketContext.Provider>,
  document.getElementById("root")
);
