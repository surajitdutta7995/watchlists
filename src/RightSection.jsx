import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { themeRed } from "./ThemeConstants";
import AppContext from "./AppContext";
import "./RightSection.css";

const RightSection = () => {
  const { setShowAddTowatchListModal, setSelectedMovie } =
    useContext(AppContext);
  const [searchParam, setSearchParam] = useState("");
  const [movies, setMovies] = useState([]);
  const searchForMovies = () => {
    searchParam &&
      axios
        .get(`https://www.omdbapi.com/?s=${searchParam}&apikey=5fefdd26`)
        .then(function (res) {
          console.log(res.data);
          setMovies(res.data.Search);
        })
        .catch(function (err) {
          console.log(err);
        });
  };
  const bookmarkIcon = (
    <div className="bookmarkContainer">
      <FontAwesomeIcon className="addIcon" icon={faPlus} />
    </div>
  );
  const checkMark = <FontAwesomeIcon icon={faCheck} color={"lime"} />;
  const addToWatchList = (movie) => {
    setSelectedMovie(movie);
    setShowAddTowatchListModal(true);
  };
  return (
    <div className="rightSection">
      <div className="hero">
        <h1 className="title">
          Welcome to <span style={{ color: `${themeRed}` }}>Watchlists</span>
        </h1>
        <p>
          Browse movies, add them to the watchlists and share them with friends.
          Just click the {bookmarkIcon} icon to add a movie, click on the poster
          to see movie details and the {checkMark} icon to mark a movie as
          watched.
        </p>
      </div>
      <div className="content">
        <div className="container">
          <input
            type="text"
            placeholder=" Search a movie "
            onChange={(event) => {
              setSearchParam(event.target.value);
            }}
            className="movieSearch"
          />
          <button className="search" onClick={searchForMovies}>
            Search
          </button>
        </div>
        <div className="posters">
          {movies?.length > 0 &&
            movies.map((movie, index) => (
              <div key={index} className="poster">
                <div
                  className="posterBookmarkContainer"
                  onClick={() => addToWatchList(movie)}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="posterBookmarkPlusIcon"
                  />
                </div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="posterBackground"
                />
                <div className="description">
                  <p className="name">{movie.Title}</p>
                  <p className="releaseYear">{`(${movie.Year})`}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
