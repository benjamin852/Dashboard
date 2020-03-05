import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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
import fetchData from "../../utils/fetchData";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green } from "@material-ui/core/colors";

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

const StartButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}))(Button);

const DashboardItem = props => {
  const [botState, setBotState] = useState(true);
  const [editState, setEditState] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const editStrategy = () => {
    setEditState(!editState);
    setBotState(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const save = () => setEditState(false);
  const stopBot = () => {
    setBotState(false);
    fetchData("http://mm.mvsfans.org:10082/strategies/stop/dummy", {
      uuid: "dac947e4-ba20-4813-8c96-8e0b63d06e65",
      cancelOrders: true
    });
  };
  const startBot = () => {
    setBotState(true);
    fetchData("http://mm.mvsfans.org:10082/strategies/start/dummy", {
      exchangeName: "biki",
      apiKey: "104529b659e4e7227fb767e5d4b7a03f",
      signature: "ba0eba924f87aaeeb9ebee07f0aa3714",
      base: "DNA",
      counter: "BTC",
      pricePercentage: 0.2,
      priceLever: 0,
      minAmount: 1,
      maxAmount: 3,
      minSleepInterval: 10000,
      maxSleepInterval: 20000,
      retryTimes: 1
    }).then(result => {
      console.log(result);
    });
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        className={`${classes.root} ${botState ? "bot-running" : "bot-paused"}`}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe">123</Avatar>}
          action={!editState ? <EditIcon onClick={editStrategy} /> : null}
          titleTypographyProps={{ variant: "h5" }}
          title="--Bot ID--"
          subheader={`Bot ID: ${props.botData.threadUuid}`}
        />
        <CardMedia
          component="img"
          alt="Crypto Dashboard"
          height="140"
          image={MetaverseImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <TextField
            fullWidth
            defaultValue={`Thread Strategy: ${props.botData.threadStrategy}`}
            disabled={editState ? false : true}
          />
          <br />
          <br />
          <TextField
            fullWidth
            multiline
            defaultValue={`Trading Since: ${props.botData.threadStartTime}`}
            disabled={editState ? false : true}
          />
          <br />
          <br />
          <TextField
            fullWidth
            defaultValue={`End Time: ${
              props.threadEndTime ? props.threadEndTime : `Ongoing Bot`
            }`}
            disabled={editState ? false : true}
          />
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField
              fullWidth
              defaultValue={`Min Sleep Interval: ${props.botData.threadConfig.minSleepInterval}`}
              disabled={editState ? false : true}
            />{" "}
            <br />
            <br />
            <TextField
              fullWidth
              defaultValue={`Max Sleep Interval: ${props.botData.threadConfig.maxSleepInterval}`}
              disabled={editState ? false : true}
            />
            <br />
            <br />
            <TextField
              fullWidth
              defaultValue={`Exchange Name: ${props.botData.threadConfig.exchangeName}`}
              disabled={editState ? false : true}
            />
            <br />
            <br />
            <TextField
              fullWidth
              defaultValue={`Counter: ${props.botData.threadConfig.counter}`}
              disabled={editState ? false : true}
            />
            <br />
            <br />
            <TextField
              fullWidth
              defaultValue={`Base: ${props.botData.threadConfig.base}`}
              disabled={editState ? false : true}
            />
            <br />
            <br />
            <TextField
              fullWidth
              defaultValue={`Max Amount: ${props.botData.threadConfig.maxAmount}`}
              disabled={editState ? false : true}
            />
            <br />
            <br />
            <TextField
              fullWidth
              defaultValue={`Price Percentage: ${props.botData.threadConfig
                .pricePercentage * 100}%`}
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
            <StartButton onClick={startBot} variant="contained">
              START
            </StartButton>
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
