import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitForElementToBeRemoved, screen } from "utils/test-utils";
import Container from "./Container";

beforeEach(async () => {
  render(<Container />);
  await screen.findByText(/house of decks/gi);
});

test("displays buttons and title", () => {
  screen.getByRole("button", { name: /Start Game/gi });
  screen.getByRole("button", { name: /Join Game/gi });
});

describe("when user click on start game", () => {
  test("renders create room", () => {
    userEvent.click(screen.getByRole("button", { name: /Start Game/gi }));
    screen.getByLabelText(/Username/gi);
    screen.getByRole("button", { name: /Start a Game/gi });
  });

  test("send create_room request", async () => {
    userEvent.click(screen.getByRole("button", { name: /Start Game/gi }));
    userEvent.type(screen.getByLabelText(/Username/gi), "test_user");
    userEvent.click(screen.getByRole("button", { name: /Start a Game/gi }));
    await screen.findByText(/Click to copy link and share with your friends/gi);
  });
});

describe("when user click on join game", () => {
  test("renders join room", async () => {
    render(<Container />);
    await screen.findByText(/house of decks/gi);
    userEvent.click(screen.getByRole("button", { name: /Join Game/gi }));
    screen.getByLabelText(/Username/gi);
    screen.getByLabelText(/Room ID/gi);
    screen.getByRole("button", { name: /Join the Game/gi });
  });
});
