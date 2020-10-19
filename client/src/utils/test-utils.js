import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SocketProvider } from "../SocketContext";
import { SoundProvider } from "../Sounds/Context";

// this is for mocking server
import "./server-mock";

const AllTheProviders = ({ children }) => {
  return (
    <SocketProvider>
      <SoundProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </SoundProvider>
    </SocketProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
