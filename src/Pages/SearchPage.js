import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Cards from "../components/Card";
import "../styles/style.css";
import Skeleton from "@material-ui/lab/Skeleton";

function SearchPage({ match }) {
  const title = match.params.id.replace("&", " ");
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/search/anime?q=${match.params.id}&page=1`)
      .then((res) => res.json())
      .then((data) => setAnimes(data.results))
      .catch((err) => console.log(err));
    setLoading(true);
  }, [animes]);
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      {loading ? (
        <div className="main">
          {animes.slice(0, 30).map((anime) => (
            <Cards key={anime.mal_id} anime={anime} />
          ))}
        </div>
      ) : (
        <div>
          <Skeleton animation="wave" variant="rect" width={350} height={350} />
          <Skeleton animation="wave" variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
