import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig, AnimationFeature, GesturesFeature } from "framer-motion";

import "./index.css";
import './utils/initYupLocale'
import { SocketProvider } from "./SocketContext";
import { SoundProvider } from "./Sounds/Context";
import { Container as GameContainer } from "./Game";

ReactDOM.render(
  <SocketProvider>
    <SoundProvider>
      <BrowserRouter>
        <MotionConfig features={[AnimationFeature, GesturesFeature]}>
          <GameContainer />
        </MotionConfig>
      </BrowserRouter>
    </SoundProvider>
  </SocketProvider>,
  document.getElementById("root")
);
