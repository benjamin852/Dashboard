import React, { useState, useEffect } from "react";
import "./App.css";
import fetchData from "./utils/fetchData";

function App() {
  let [allBots, setAllBots] = useState([]);
  useEffect(() => {
    // fetchData("http://localhost:3000/threads", {}).then(result => {
    //   console.log(result);
    // });
    fetch("http://localhost:3004/threads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", JSON.stringify(data));
      });
  }, []);
  return <div className="App"></div>;
}

export default App;
