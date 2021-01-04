import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "utils/test-utils";
import Container from "./Container";

beforeEach(async () => {
  render(<Container />);
  await screen.findByText(/house of decks/gi);
});

test("displays buttons and title", () => {
  screen.getByRole("button", { name: /Start Game/gi });
  screen.getByRole("button", { name: /Join Game/gi });
});

describe("when user click start game button", () => {
  test("renders create room", () => {
    userEvent.click(screen.getByRole("button", { name: /Start Game/gi }));
    screen.getByLabelText(/Username/gi);
    screen.getByRole("button", { name: /Start a Game/gi });
  });

  test("sends create request and redirects to waiting room", async () => {
    userEvent.click(screen.getByRole("button", { name: /Start Game/gi }));
    userEvent.type(screen.getByLabelText(/Username/gi), "test_user");
    userEvent.click(screen.getByRole("button", { name: /Start a Game/gi }));
    await screen.findByText(/Click to copy link and share with your friends/gi);
  });
});

describe("when user clicks join game button", () => {
  test("renders join room", async () => {
    render(<Container />);
    await screen.findByText(/house of decks/gi);
    userEvent.click(screen.getByRole("button", { name: /Join Game/gi }));
    screen.getByLabelText(/Username/gi);
    screen.getByLabelText(/Room ID/gi);
    screen.getByRole("button", { name: /Join the Game/gi });
  });

  test("sends join request and redirects to waiting room", async () => {
    render(<Container />);
    await screen.findByText(/house of decks/gi);
    userEvent.click(screen.getByRole("button", { name: /Join Game/gi }));
    userEvent.type(screen.getByLabelText(/Username/gi), "test-user");
    userEvent.type(screen.getByLabelText(/Room ID/gi), window.testGameID);
    userEvent.click(screen.getByRole("button", { name: /Join the Game/gi }));
    await screen.findByText(/Click to copy link and share with your friends/gi);
    screen.getByRole("heading", { name: window.testGameID });
    screen.getByText(/host-user/gi);
    screen.getByText(/test-user/gi);
  });
});
