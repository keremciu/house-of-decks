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
    leave_room: (reason) => {
      game = service.leaveRoom({ username: ws.username, roomID: ws.gameID });
      ws.gameID = null;
      ws.username = null;
      broadcastRoom(game);
      console.log("USER IS LEAVING :(", reason);
    },
  };

  try {
    // TODO: find better way for this, maybe add parsedMessage.service === 'room'
    // create can use broadcastRoom functionality
    // basically create and join can be part of something useful
    // maybe we need to pass `ws` and `broadcastRoom` functions when there is service === 'room'
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
