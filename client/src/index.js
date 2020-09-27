import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import SocketContext from "./SocketContext";
import { SoundProvider } from "./Sounds/Context";
import { StoreProvider } from "./Store";
import { Container as GameContainer } from "./Game";

const socket = new WebSocket(`ws://${location.host}`);
socket.sendMessage = (object) => socket.send(JSON.stringify(object));

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
