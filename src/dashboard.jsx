import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MetaverseImage from "./assets/metaverse-image.jpg";
import TextField from "@material-ui/core/TextField";
import fetchData from "./utils/fetchData";

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

export default function Dashbaord() {
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
        setAllBots(data);
      });
  }, []);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Crypto Dashboard"
          height="140"
          image={MetaverseImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Strategy Number
          </Typography>
          <TextField defaultValue="Result #1" disabled="true" />
          <br />
          <br />
          <TextField defaultValue="Result #2" disabled="true" />
          <br />
          <br />
          <TextField defaultValue="Result #3" disabled="true" />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Button 1
        </Button>
        <Button size="small" color="primary">
          Button 2
        </Button>
      </CardActions>
    </Card>
  );
}
