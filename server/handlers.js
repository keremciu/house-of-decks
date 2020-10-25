const resolveHandlers = ({ ws, broadcastRoom, service, message }) => {
  let game;
  const parsedMessage = JSON.parse(message);

  const actions = {
    create: () => {
      game = service.createRoom(parsedMessage.payload);
      ws.gameID = game.id;
      ws.username = parsedMessage.payload.username;
      ws.send(
        JSON.stringify({
          game: game.getData(),
          player: game.findPlayer(ws.username),
        })
      );
    },
    join: () => {
      game = service.joinRoom(parsedMessage.payload);
      ws.gameID = game.id;
      ws.username = parsedMessage.payload.username;
      broadcastRoom(game);
    },
    leave: () => {
      console.log("leaaaving");
    },
  };

  try {
    if (actions[parsedMessage.action]) {
      actions[parsedMessage.action]();
    } else {
      game = service.findGame(ws.gameID);
      game[parsedMessage.action](parsedMessage.payload);
      broadcastRoom(game);
    }
  } catch (error) {
    ws.send(
      JSON.stringify({
        errors: [error.message],
      })
    );
  }
};

export default resolveHandlers;
