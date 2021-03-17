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
function Genre(props) {
  const classes = useStyles();

  const [animes, setAnimes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
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
  console.log(pageNumber);
  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/genre/anime/${props.location.state}`)
      .then((res) => res.json())
      .then((data) => setAnimes(data.anime));
    setLoading(true);
  }, [props.match.params.id, pageNumber]);
  return (
    <>
      <Typography align="left" variant="h4" gutterBottom style={{ margin: 20 }}>
        {props.match.params.id}
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
          count={pageCount - 1}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
}

export default Genre;
