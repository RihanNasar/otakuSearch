import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LoopIcon from "@material-ui/icons/Loop";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    minWidth: 335,
    maxWidth: 500,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

function QuoteCard() {
  const [quote, setQuote] = useState({});
  const [count, setCount] = useState(0);
  const classes = useStyles();
  console.log(quote.length);
  useEffect(() => {
    fetch("https://animechan.vercel.app/api/random")
      .then((response) => response.json())
      .then((quote) => setQuote(quote));
  }, [count]);

  return (
    <>
      {Object.keys(quote).length != 0 ? (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Button
              onClick={() => setCount(count + 1)}
              variant="contained"
              size="small"
              color="primary"
            >
              <LoopIcon />
            </Button>
            <Typography
              fontWeight="fontWeightBold"
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Random Quote
            </Typography>
            <Typography gutterBottom variant="h6">
              {quote.anime} ▶
            </Typography>

            <Typography variant="subtitle1">{quote.quote}</Typography>
          </CardContent>
          <CardActions>
            <Typography variant="h6">~ {quote.character}</Typography>
          </CardActions>
        </Card>
      ) : (
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />

          <Skeleton variant="rect" width={210} height={118} />
        </div>
      )}
    </>
  );
}

export default QuoteCard;
