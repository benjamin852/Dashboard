import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

import MetaverseImage from "../assets/metaverse-image.jpg";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import fetchData from "../utils/fetchData";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green } from "@material-ui/core/colors";
import momnet from "moment";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  reportButton: {
    marginLeft: "auto",
    borderRadius : 5,
    fontSize : 18,
  },
  expand: {
    borderRadius: 5,
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    borderRadius: 5,
    transform: "rotate(180deg)"
  },
  marginBottom: {
    marginBottom: 5
  }
}));

const StartButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[200],
    "&:hover": {
      backgroundColor: green[100]
    }
  }
}))(Button);

const DashboardItem = ({ botData }) => {
  const [botState, setBotState] = useState(true);
  const [editState, setEditState] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [report, setReport] = useState([]);

  const classes = useStyles();

  const editStrategy = () => {
    setEditState(!editState);
    setBotState(false);
  };

  const handleExpandClick = () => {
    fetchData("http://mm.mvsfans.org:10082/api/strategies/query/report", {
      uuid: botData.threadUuid,
      startTimestamp: 1583038800,
      endTimestamp: 1583209945
    }).then(report => {
      setReport(report);
    });
    setExpanded(!expanded);
  };

  const save = () => setEditState(false);

  const stopBot = async () => {
    setButtonLoading(true);
    setBotState(false);
    const result = await fetchData(
      "http://mm.mvsfans.org:10082/api/threads/query/status/all",
      {
        uuid: "dac947e4-ba20-4813-8c96-8e0b63d06e65",
        cancelOrders: true
      }
    );
    console.log(result, "stop");
    if (result !== null || undefined) {
      setButtonLoading(false);
    }
  };

  const startBot = async () => {
    setButtonLoading(true);
    setBotState(true);
    const result = await fetchData(
      "http://mm.mvsfans.org:10082/strategies/start/dummy",
      {
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
      }
    );
    console.log(result, "start");
    if (result !== null || undefined) {
      setButtonLoading(false);
    }
    return true;
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        className={`${classes.root} ${botState ? "bot-running" : "bot-paused"}`}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe">{botData.threadStrategy}</Avatar>}
          action={
            !editState ? (
              <EditIcon fontSize="small" onClick={editStrategy} />
            ) : null
          }
          titleTypographyProps={{ variant: "h5" }}
          title={`${botData.threadConfig.base} / ${botData.threadConfig.counter}`}
          subheader={`${botData.threadUuid}`}
        />
        {/* <CardMedia
          component="img"
          alt="Crypto Dashboard"
          height="140"
          image={MetaverseImage}
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <TextField
            fullWidth
            className={classes.marginBottom}
            label="Exchange Name"
            id="exchangeName"
            size="small"
            defaultValue={botData.threadConfig.exchangeName}
            disabled={editState ? false : true}
          />
          <TextField
            fullWidth
            className={classes.marginBottom}
            label="API Key"
            id="apiKey"
            defaultValue={botData.threadConfig.apiKey}
            size="small"
            disabled={editState ? false : true}
          />
          <TextField
            fullWidth
            className={classes.marginBottom}
            label="Signature"
            defaultValue={botData.threadConfig.signature}
            id="signature"
            size="small"
            disabled={editState ? false : true}
          />

          <TextField
            fullWidth
            className={classes.marginBottom}
            id="threadStartTime"
            size="small"
            label="Trading Since"
            defaultValue={new Date(botData.threadStartTime)}
            disabled={editState ? false : true}
          />
          <TextField
            fullWidth
            className={classes.marginBottom}
            size="small"
            id="threadEndTime"
            label="End Time"
            defaultValue={
              botData.threadEndTime
                ? new Date(botData.threadEndTime)
                : `Ongoing Bot`
            }
            disabled={editState ? false : true}
          />
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Followed Exchange Name"
              id="followedExchangeName"
              defaultValue={botData.threadConfig.followedExchangeName}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Depth"
              id="depth"
              defaultValue={botData.threadConfig.depth}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Stages"
              id="stages"
              defaultValue={botData.threadConfig.stages}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Price Lever"
              id="priceLever"
              defaultValue={botData.threadConfig.priceLever}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Amount Lever"
              id="amountLever"
              defaultValue={botData.threadConfig.amountLever}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Min Sleep Interval"
              id="minSleepInterval"
              defaultValue={botData.threadConfig.minSleepInterval}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Max Sleep Interval"
              id="maxSleepInterval"
              defaultValue={botData.threadConfig.maxSleepInterval}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Min Amount"
              id="minAmount"
              defaultValue={botData.threadConfig.minAmount}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Max Amount"
              id="maxAmount"
              defaultValue={botData.threadConfig.maxAmount}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Save Orders"
              id="saveOrders"
              defaultValue={botData.threadConfig.saveOrders}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Ask Spread Index"
              id="askSpreadIndex"
              defaultValue={botData.threadConfig.askSpreadIndex}
              size="small"
              disabled={editState ? false : true}
            />
            <TextField
              fullWidth
              className={classes.marginBottom}
              label="Bid Spread Index"
              id="bidSpreadIndex"
              defaultValue={botData.threadConfig.bidSpreadIndex}
              size="small"
              disabled={editState ? false : true}
            />
            {!report ? (
              ""
            ) : (
              <>
                <hr />
                <h4>
                  REPORT : {report.base} / {report.counter}
                </h4>
                <div>
                  <strong>Base Volume :</strong>
                  <span>{report.baseVolume}</span>
                </div>
                <div>
                  <strong>Counter Volume :</strong>
                  <span>
                    {report.counterVolume} {report.counter}
                  </span>
                </div>

                <div>
                  <strong>Base Commission :</strong>
                  <span>
                    {report.baseCommission} {report.base}
                  </span>
                </div>
                <div>
                  <strong>Counter Commission :</strong>
                  <span>
                    {report.CounterCommission} {report.counter}
                  </span>
                </div>
                <div>
                  <strong>Average Price :</strong>
                  <span>{report.averagePrice}</span>
                </div>
                <div>
                  <strong>Base Average Price :</strong>
                  <span>
                    {report.baseAveragePrice} {report.base}
                  </span>
                </div>
                <div>
                  <strong>Counter Average Price :</strong>
                  <span>
                    {report.counterAveragePrice} {report.counter}
                  </span>
                </div>
                <div>
                  <strong>Number of Transactions :</strong>
                  <span>{report.numberOfTransactions}</span>
                </div>
              </>
            )}
          </CardContent>
        </Collapse>

        <CardActions disableSpacing>
          {editState ? (
            <Button onClick={save} variant="contained" color="primary">
              SAVE
            </Button>
          ) : botData.threadIsRunning ? (
            <Button onClick={stopBot} variant="contained" color="secondary">
              {buttonLoading === false ? (
                "STOP"
              ) : (
                <CircularProgress
                  variant="determinate"
                  value={100}
                  className={classes.top}
                  size={24}
                  thickness={4}
                />
              )}
            </Button>
          ) : (
            <StartButton onClick={startBot} variant="contained">
              {buttonLoading === false ? (
                "START"
              ) : (
                <CircularProgress
                  variant="determinate"
                  value={100}
                  className={classes.top}
                  size={24}
                  thickness={4}
                />
              )}
            </StartButton>
          )}
          <IconButton
            className={classes.reportButton}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            Report{" "}
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
            />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DashboardItem;
