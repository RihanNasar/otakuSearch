import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import QuoteCard from "../components/QuoteCard";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Skeleton from "@material-ui/lab/Skeleton";
import "../styles/style.css";
import LinkIcon from "@material-ui/icons/Link";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "auto",
    flexGrow: 1,
  },
  first_section: {
    marginTop: 14,
  },
  second_section: {
    height: "auto",
    width: "auto",
    display: "flex",
    marginTop: 120,
    flexDirection: "column",
  },
  button: {
    display: "flex",
    flexWrap: "wrap",
  },
  genre: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },

  image: {
    margin: 12,
    [theme.breakpoints.down("sm")]: {
      height: 450,
      width: 350,
    },
    borderRadius: 16,
    [theme.breakpoints.up("md")]: {
      height: 650,
      width: 500,
    },
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  },
}));
function AnimePage({ match }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  const [anime, setAnime] = useState({
    genres: [],
  });
  console.log(anime);
  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/anime/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setAnime(data));
    setLoading(true);
  }, [match.params.id]);

  return (
    <div key={anime.mal_id} className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid
          item
          container
          justify="center"
          className={classes.first_section}
          xs={12}
          sm={12}
          md={6}
        >
          {loading ? (
            <img className={classes.image} src={anime.image_url} />
          ) : (
            <Skeleton variant="rect" className={classes.image} />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {loading ? (
            <>
              <Typography
                style={{ marginTop: "14px" }}
                variant="h3"
                gutterBottom
              >
                {anime.title}
              </Typography>
              <h2 className={`tag ${setVoteClass(anime.score)}`}>
                {anime.score}
              </h2>
              <Typography variant="overline" display="block">
                THE GENRES :
              </Typography>
              <Paper
                elevation={0}
                style={{ marginBottom: "10px" }}
                className={classes.genre}
              >
                {anime.genres.map((genre) => (
                  <Typography variant="subtitle2"> ⭕ {genre.name} </Typography>
                ))}
              </Paper>
              <Typography variant="overline" display="block">
                THE SyNOPSIS :
              </Typography>
              <Typography variant="subtitle2">{anime.synopsis}</Typography>
              <Paper
                elevation={0}
                style={{ marginBottom: "10px", marginTop: "12px" }}
                className={classes.genre}
              >
                <Button
                  style={{ margin: 8 }}
                  size="small"
                  variant="outlined"
                  color="primary"
                  href={anime.url}
                >
                  <LinkIcon />
                </Button>
                {anime.trailer_url != null ? (
                  <Button
                    size="small"
                    onClick={() => setOpen(true)}
                    variant="outlined"
                    color="primary"
                  >
                    <YouTubeIcon />
                  </Button>
                ) : (
                  console.log("no trailer url")
                )}
                <ModalVideo
                  channel="custom"
                  autoplay
                  isOpen={open}
                  url={anime.trailer_url}
                  onClose={() => setOpen(false)}
                />
              </Paper>
            </>
          ) : (
            <div style={{ margin: 20 }}>
              {numbers.map((_) => (
                <Skeleton variant="text" />
              ))}
            </div>
          )}
        </Grid>
        <Grid
          item
          style={{ marginTop: "20px" }}
          container
          justify="center"
          xs={12}
        >
          <QuoteCard key={Math.random() * 12134134} />
        </Grid>
      </Grid>
    </div>
  );
}

export default AnimePage;
