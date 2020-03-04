import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { green } from "@material-ui/core/colors";
import fetchData from "../utils/fetchData";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

const NewBot = () => {
  const [availableBots, setAvailableBots] = useState([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchData("http://mm.mvsfans.org:10082/threads/query/status", {
      uuid: "dac947e4-ba20-4813-8c96-8e0b63d06e65"
    }).then(result => {
      console.log(result);
    });
    // fetch("http://localhost:3004/strategies", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setAvailableBots(data);
    //   });
  }, []);

  const classes = useStyles();

  return (
    <>
      <Button color="red" style={{ backgroundColor: "red" }}>
        <Icon
          className="fa fa-plus-circle"
          style={{ fontSize: 30, color: green[500] }}
        >
          add_circle
        </Icon>
      </Button>
    </>
  );
};

export default NewBot;
