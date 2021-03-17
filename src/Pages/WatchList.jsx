import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Typography } from "@material-ui/core";
import WatchListCard from "../components/WatchListCard";
import "../styles/style.css";
import { Link } from "react-router-dom";
import naruto from "../assets/naruto.png";
function WatchList() {
  const { watchlist } = useContext(GlobalContext);
  return (
    <div key={Math.random * 92913213}>
      <Typography style={{ margin: "20px" }} gutterBottom variant="h4">
        WatchList
      </Typography>
      <div style={{ marginTop: "30px" }} className="main">
        {watchlist.length > 0 ? (
          watchlist.map((anime) => (
            <WatchListCard key={anime.mal_id} anime={anime} />
          ))
        ) : (
          <div>
            <Typography gutterBottom style={{ marginTop: "35px" }} variant="h5">
              {" "}
              Add Something to the WatchList..
            </Typography>
            <br></br>
            <Link to="/">
              <img src={naruto} alt="logo" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;
