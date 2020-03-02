import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import fetchData from "./utils/fetchData";
import "./App.css";

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
  return <Dashboard />;
}

export default App;
