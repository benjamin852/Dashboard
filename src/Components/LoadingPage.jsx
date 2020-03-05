import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Dashboard from "./Dashboard";
import NewBot from "./NewBot";
import ReactLoading from "react-loading";

const LoadingPage = props => {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {!loading ? (
        <Dashboard />
      ) : (
        <div>
          <Skeleton variant="rect" width={210} height={118} />
          <ReactLoading
            type={"spinningBubbles"}
            color={"#476348"}
            height={"20%"}
            width={"20%"}
          />
          <NewBot />
        </div>
      )}
      )
    </Grid>
  );
};

export default LoadingPage;
