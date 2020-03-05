import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Dashboard from "./Dashboard";
import NewBot from "./NewBot";
import ReactLoading from "react-loading";

const LoadingPage = props => {
  const loading = false;

  return (
    <Grid container wrap="nowrap">
      {loading ? (
        <div>
          <Skeleton variant="rect" width={210} height={118} />
          {/* <ReactLoading
          type={"spinningBubbles"}
          color={"#476348"}
          height={"5%"}
          width={"5%"}
        /> */}
          <NewBot />
        </div>
      ) : (
        <Dashboard />
      )}
      )
    </Grid>
  );
};

export default LoadingPage;
