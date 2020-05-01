import React from "react";
import ReactDOM from "react-dom";
import * as io from "socket.io-client";

import "./index.css";
import SocketContext from "./SocketContext";
import { SoundProvider } from "./Sounds/Context";
import { StoreProvider } from "./Store";
import { Container as GameContainer } from "./Game";

const socket = io({ transports: ["websocket"], upgrade: false });

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <SoundProvider>
      <StoreProvider>
        <GameContainer />
      </StoreProvider>
    </SoundProvider>
  </SocketContext.Provider>,
  document.getElementById("root")
);
