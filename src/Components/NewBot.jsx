import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

/*
TODO:
dividers -> for expanding
focus points -> for increased ux
*/

const NewBot = () => {
  const [availableBots, setAvailableBots] = useState([]);

  useEffect(() => {
    // fetchData("http://localhost:3000/threads", {}).then(result => {
    //   console.log(result);
    // });
    fetch("http://localhost:3004/strategies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setAvailableBots(data);
      });
  }, []);



  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action= {}
        title="Strategy Results"
        subheader="September 14, 2019 - March 2, 2020"
      />
      <CardActionArea>
        <CardContent></CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};

export default NewBot;
