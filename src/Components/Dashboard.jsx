import React, { useState, useEffect } from "react";
import DashboardItem from "./DashboardItem";
import Grid from "@material-ui/core/Grid";
import fetchData from "../utils/fetchData";

import NewBot from "./NewBot";

const Dashboard = () => {
  const [allBotsData, setAllBotsData] = useState([]);
  // const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchData(
      "http://mm.mvsfans.org:10082/api/threads/query/status/all",
      {}
    ).then(bots => {
      setAllBotsData(bots);
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
      <NewBot />
    </Grid>
  );
};

export default Dashboard;
