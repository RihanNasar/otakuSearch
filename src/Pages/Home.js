import React, { useState, useEffect } from "react";
import Cards from "../components/Card";
import "../styles/style.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: 8,
  },
}));
function Home() {
  const classes = useStyles();

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const animePerPage = 10;
  const pagesVisited = pageNumber * animePerPage;

  const displayPage = pagesVisited - animePerPage;

  const pageCount = Math.ceil(animes.length / animePerPage);

  const displayAnime = animes
    .slice(displayPage, displayPage + animePerPage)
    .map((anime) => <Cards key={anime.mal_id} anime={anime} />);
  const handleChange = (event, value) => {
    setPageNumber(value);
  };
  useEffect(() => {
    fetch("https://api.jikan.moe/v3/top/anime/1/tv")
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data.top);
        setLoading(true);
        console.log(loading);
      });
  }, []);
  return (
    <>
      <Typography align="left" variant="h4" gutterBottom style={{ margin: 20 }}>
        Trending 🔥
      </Typography>
      <div className="container">
        <div className="main">
          {loading ? (
            displayAnime
          ) : (
            <div>
              <Skeleton
                animation="wave"
                variant="rect"
                width={350}
                height={350}
              />
              <Skeleton animation="wave" variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          )}
        </div>

        <Pagination
          className={classes.pagination}
          size="large"
          count={4}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
}

export default Home;
