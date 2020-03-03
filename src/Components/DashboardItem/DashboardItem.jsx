import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

import MetaverseImage from "../../assets/metaverse-image.jpg";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";

// import fetchData from "../utils/fetchData";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./DashboardItem.css";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const DashboardItem = () => {
  const [allBots, setAllBots] = useState([]);
  const [botStatus, setBotStatus] = useState(true);
  const [editState, setEditState] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const save = () => {
    setEditState(false);
  };

  return (
    <Card
      className={`${classes.root} ${botStatus ? "bot-running" : "bot-paused"}`}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={!editState ? <EditIcon onClick={editStrategy} /> : null}
        titleTypographyProps={{ variant: "h5" }}
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField
            defaultValue="Result #4"
            disabled={editState ? false : true}
          />{" "}
          <TextField
            defaultValue="Result #5"
            disabled={editState ? false : true}
          />
          <TextField
            defaultValue="Result #6"
            disabled={editState ? false : true}
          />
          <TextField
            defaultValue="Result #7"
            disabled={editState ? false : true}
          />
          <TextField
            defaultValue="Result #8"
            disabled={editState ? false : true}
          />
        </CardContent>
      </Collapse>

      <CardActions disableSpacing>
        {editState ? (
          <Button onClick={save} color="primary">
            SAVE!
          </Button>
        ) : botStatus ? (
          <Button color="red">STOP</Button>
        ) : (
          <Button color="green">RUN</Button>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          {/* {expanded ? "Show Less" : "Show More"} */}
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DashboardItem;
