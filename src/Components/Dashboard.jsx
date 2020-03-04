import React, { useState, useEffect } from "react";
import DashboardItem from "./DashboardItem/DashboardItem";
import Grid from "@material-ui/core/Grid";

const Dashboard = () => {
  const [allBotsData, setAllBotsData] = useState([]);

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
        setAllBotsData(data);
      });
  }, []);

  const renderedDashboardItems = allBotsData.map(singleBotData => {
    return (
      <DashboardItem key={singleBotData.threadUuid} botData={singleBotData} />
    );
  });

  return (
    <Grid container spacing={2}>
      {renderedDashboardItems}
    </Grid>
  );
};

export default Dashboard;
