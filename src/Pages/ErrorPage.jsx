import React from "react";
import { Link } from "react-router-dom";
import naruto from "../assets/naruto.png";
import { Typography } from "@material-ui/core";
import "../styles/style.css";

function ErrorPage() {
  console.log(navigator.onLine);
  return (
    <div className="container">
      <Typography
        align="center"
        gutterBottom
        style={{ marginTop: "50px" }}
        variant="h3"
      >
        404, Something Went Wrong
      </Typography>

      <Typography
        align="center"
        gutterBottom
        style={{ marginTop: "30px" }}
        variant="h3"
      >
        Go Back Senpai
      </Typography>
      <Link to="/">
        <img src={naruto} alt="logo" />
      </Link>
    </div>
  );
}

export default ErrorPage;
