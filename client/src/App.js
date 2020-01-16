import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");
  const [players, setPlayers] = useState({});
  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(data => setResponse(data));
    const socket = io();
    socket.on("currentPlayers", function(players) {
      setPlayers(players);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Api Response: {response.text}</p>
        <ul>
          {Object.keys(players).map(id => (
            <li>{id}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
