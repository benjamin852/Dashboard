import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import MetaverseImage from "../../assets/metaverse-image.jpg";
import TextField from "@material-ui/core/TextField";
// import fetchData from "../utils/fetchData";
import EditIcon from "@material-ui/icons/Edit";

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

const DashboardItem = () => {
  let [allBots, setAllBots] = useState([]);
  let [editState, setEditState] = useState(false);

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

  const editStrategy = () => setEditState(!editState);

  return (
    <Card className={classes.root}>
      <CardHeader
        action={<EditIcon onClick={editStrategy} />}
        title="Strategy Results"
        subheader="September 14, 2019 - March 2, 2020"
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Crypto Dashboard"
          height="140"
          image={MetaverseImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <TextField
            defaultValue="Result #1"
            disabled={editState ? false : true}
          />
          <br />
          <br />
          <TextField
            defaultValue="Result #2"
            disabled={editState ? false : true}
          />
          <br />
          <br />
          <TextField
            defaultValue="Result #3"
            disabled={editState ? false : true}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary">Button 1</Button>
        <Button color="primary">Button 2</Button>
      </CardActions>
    </Card>
  );
};

export default DashboardItem;
