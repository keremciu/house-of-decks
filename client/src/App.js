import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(data => setResponse(data));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Api Response: {response.text}</p>
      </header>
    </div>
  );
}

export default App;
