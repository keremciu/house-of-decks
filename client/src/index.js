import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { SocketProvider } from "./SocketContext";
import { SoundProvider } from "./Sounds/Context";
import { StoreProvider } from "./Store";
import { Container as GameContainer } from "./Game";

ReactDOM.render(
  <SocketProvider>
    <SoundProvider>
      <StoreProvider>
        <GameContainer />
      </StoreProvider>
    </SoundProvider>
  </SocketProvider>,
  document.getElementById("root")
);
