import React, { useState } from "react";
import "../SearchBar.css";

import Searchpage from "../Pages/SearchPage";
import { useHistory } from "react-router-dom";
function Searchbar() {
  const history = useHistory();
  const [inputText, setInputText] = useState("");

  function HandleSubmit(e) {
    e.preventDefault();
    const anime_text = inputText.replace(/ /g, "&");
    history.push(`/search/${anime_text}`);
    setInputText("");
  }
  return (
    <div className="search">
      <form onSubmit={HandleSubmit}>
        <input
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          type="text"
          placeholder="Search . . ."
          required
        />
      </form>
    </div>
  );
}

export default Searchbar;
