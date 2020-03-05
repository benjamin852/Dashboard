import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import fetchData from "../utils/fetchData";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  margin: {
    margin: theme.spacing(1)
  },
  addIcon: {
    marginRight: theme.spacing(1)
  },
  relative: {
    position: "relative"
  },
  plusButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  marginBottom: {
    marginBottom: 5
  },
  blur: {
    transition: "all 600ms",
    filter: "blur(15px)"
  },
  zeroBlur: {
    filter: "blur(0)"
  },
  displayNone: {
    display: "none"
  },
  transition : {
    transition : "all 600ms"
  }
}));

const NewBot = () => {
  const [availableBots, setAvailableBots] = useState([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchData("http://mm.mvsfans.org:10082/strategies/query/all", {
      //body
    }).then(result => {
      console.log(result);
      setAvailableBots(result);
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

  useEffect(() => {
    fetchData("http://mm.mvsfans.org:10082/strategies/query/all", {
      //body
    }).then(result => {
      console.log(result);
      setAvailableBots(result);
    });
  }, [form]);

  const classes = useStyles();

  const showForm = async event => {
    setForm(true);
  };

  const submitNewBot = () => {};

  return (
    <Grid item xs={12} md={4}>
      <Card className={`${classes.root} ${classes.relative}`}>
        <CardActionArea className={`${classes.transition} ${form ? "" : classes.blur}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Start a New Bot
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Select Strategy
              </InputLabel>
              <Select
                className={classes.marginBottom}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange=
              >
                {availableBots.map(bot => (
                  <MenuItem value={bot.strategyId}>
                    {bot.strategyDescription}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                className={classes.marginBottom}
                label="Retry Times"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="API Key"
                id="standard-size-small"
                defaultValue="104529b659e4e7227fb767e5d4b7a03f"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Signature"
                defaultValue="ba0eba924f87aaeeb9ebee07f0aa3714"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Price Lever"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Min Sleep Interval"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Max Sleep Interval"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Exchange Name"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Max Amount"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Price Percentage"
                id="standard-size-small"
                size="small"
              />
              <TextField
                className={classes.marginBottom}
                label="Base"
                id="standard-size-small"
                size="small"
              />
            </FormControl>
          </CardContent>
        </CardActionArea>
        <CardActions className={`${classes.transition} ${form ? "" : classes.blur}`}>
          <Button size="small" color="primary">
            Start
          </Button>
          <Button size="small" color="red">
            CANCEL
          </Button>
        </CardActions>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={showForm}
          className={`${classes.plusButton} ${
            form ? classes.displayNone : classes.zeroBlur
          }`}
        >
          <AddIcon className={classes.addIcon} />
          New Bot
        </Fab>
      </Card>
    </Grid>
  );
};

export default NewBot;
