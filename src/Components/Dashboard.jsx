import React, { useState, useEffect } from "react";
import DashboardItem from "./DashboardItem";
import Grid from "@material-ui/core/Grid";
// import Skeleton from "@material-ui/lab/Skeleton";

// import ReactLoading from "react-loading";

import NewBot from "./NewBot";

const Dashboard = () => {
  const [allBotsData, setAllBotsData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // fetchData("http://localhost:3000/threads", {}).then(result => {
    //   console.log(result);
    // });
    setloading(true);
    fetch("http://localhost:3004/threads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setAllBotsData(data);
        setTimeout(() => {
          setloading(false);
        }, 10000);
      });
  }, []);

  const renderedDashboardItems = allBotsData.map(singleBotData => {
    return (
      <DashboardItem key={singleBotData.threadUuid} botData={singleBotData} />
    );
  });

  const testing = () => {
    return <p>heyyy</p>;
  };

  return (
    <Grid container spacing={2}>
      {renderedDashboardItems}
      <NewBot />
    </Grid>
  );
};

export default Dashboard;
