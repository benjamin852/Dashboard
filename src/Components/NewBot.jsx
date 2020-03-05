import React, { useState, useEffect } from "react";
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
import Alert from "@material-ui/lab/Alert";

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
  transition: {
    transition: "all 600ms"
  },
  alert: {
    position: "absolute",
    zIndex: 1,
    margin: "0 auto",
    minWidth: "100%"
  }
}));

const NewBot = () => {
  const [availableBots, setAvailableBots] = useState([]);
  const [form, setForm] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
    fetchData("http://mm.mvsfans.org:10082/strategies/query/all", {
      //body
    })
      .then(result => {
        console.log(result);
        setAvailableBots(result);
      })
      .catch(error => {
        setErrors([...errors, "Could not fetch Available Bots!"]);
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
    setErrors([]);
    if (form) {
      fetchData("http://mm.mvsfans.org:10082/strategies/query/all", {
        //body
      })
        .then(result => {
          console.log(result);
          setAvailableBots(result);
        })
        .catch(error => {
          setErrors([...errors, "Could not fetch Available Bots!"]);
        });
    }
  }, [form]);

  const classes = useStyles();

  const showForm = async event => {
    setForm(true);
  };

  const submitNewBot = () => {};

  return (
    <Grid item xs={12} md={4}>
      <Card className={`${classes.root} ${classes.relative}`}>
        {errors.length > 0
          ? errors.map(err => (
              <Alert
                fullWidth
                className={`${classes.root} ${classes.alert}`}
                severity="error"
              >
                {err}
              </Alert>
            ))
          : ""}
        <CardActionArea
          className={`${classes.transition} ${form ? "" : classes.blur}`}
        >
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
                value={""}
                // onChange=
              >
                {availableBots
                  ? availableBots.map(bot => (
                      <MenuItem key={bot.strategyId} value={bot.strategyId}>
                        {bot.strategyDescription}
                      </MenuItem>
                    ))
                  : ""}
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
                label="Min Amount"
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
        <CardActions
          className={`${classes.transition} ${form ? "" : classes.blur}`}
        >
          <Button onClick={submitNewBot} size="small" color="primary">
            Start
          </Button>
          <Button onClick={() => setForm(false)} size="small" color="red">
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
