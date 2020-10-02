import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { SocketProvider } from "./SocketContext";
import { SoundProvider } from "./Sounds/Context";
import { Container as GameContainer } from "./Game";

ReactDOM.render(
  <SocketProvider>
    <SoundProvider>
      <BrowserRouter>
        <GameContainer />
      </BrowserRouter>
    </SoundProvider>
  </SocketProvider>,
  document.getElementById("root")
);
