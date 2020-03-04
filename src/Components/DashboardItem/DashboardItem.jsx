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
import Grid from "@material-ui/core/Grid";

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

const DashboardItem = props => {
  const [botState, setBotState] = useState(true);
  const [editState, setEditState] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  useEffect(() => {
    console.log(props.botData);
  }, []);

  const editStrategy = () => {
    setEditState(!editState);
    setBotState(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const save = () => setEditState(false);
  const stopBot = () => setBotState(false);
  const startBot = () => setBotState(true);

  return (
    <Grid item xs={12} md={4}>
      <Card
        className={`${classes.root} ${botState ? "bot-running" : "bot-paused"}`}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={!editState ? <EditIcon onClick={editStrategy} /> : null}
          titleTypographyProps={{ variant: "h5" }}
          title="Strategy Results"
          subheader={props.botData.threadUuid}
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
            <Button onClick={save} variant="contained" color="primary">
              SAVE!
            </Button>
          ) : botState ? (
            <Button onClick={stopBot} variant="contained" color="secondary">
              STOP
            </Button>
          ) : (
            <Button onClick={startBot} variant="contained" color="green">
              RUN
            </Button>
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
    </Grid>
  );
};

export default DashboardItem;
