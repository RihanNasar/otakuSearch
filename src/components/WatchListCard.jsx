import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../context/GlobalState";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 315,
    height: 500,
    margin: 7,
  },
  hover: {
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  button: {
    display: "flex",
  },
  media: {
    marginTop: 1,
    objectFit: "contain",
    width: 300,
    height: 350,
  },
});

function WatchListCard({ anime }) {
  const classes = useStyles();
  const { deleteAnimeFromWatchList } = useContext(GlobalContext);
  return (
    <>
      <Card className={classes.root}>
        <Link style={{ textDecoration: "none" }} to={`/anime/${anime.mal_id}`}>
          <CardActionArea className={classes.hover}>
            <CardMedia
              component="img"
              className={classes.media}
              image={anime.image_url}
              title={anime.title}
            />
            <CardContent>
              <Typography
                noWrap
                className={classes.fonts}
                variant="h6"
                component="h2"
              >
                {anime.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button
            size="medium"
            color="primary"
            variant="outlined"
            onClick={() => deleteAnimeFromWatchList(anime.mal_id)}
          >
            <DeleteIcon />
          </Button>
          <Button size="small" color="primary">
            {Array(Math.ceil(anime.score / 2))
              .fill()
              .map((_) => (
                <Typography className={classes.button} variant="subtitle1">
                  ⭐
                </Typography>
              ))}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default WatchListCard;
