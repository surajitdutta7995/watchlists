import { useContext, useEffect, useState } from "react";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "./AppContext";
import { themeRed } from "./ThemeConstants";

const WatchList = () => {
  const { watchLists, setWatchLists, selectedWatchlist, setSelectedWatchlist } =
    useContext(AppContext);
  const renderCheckMark = (movie) => {
    return (
      <FontAwesomeIcon
        icon={faCheck}
        color={movie.isSeen ? "lime" : "#fff"}
        style={{ position: "absolute", right: "10px", top: "10px" }}
        onClick={() => addToSeen(movie)}
      />
    );
  };
  const addToSeen = (movie) => {
    const movieIndex = selectedWatchlist.movies.findIndex(
      (film) => film.imdbID === movie.imdbID
    );
    const updatedWatchList = selectedWatchlist;
    updatedWatchList.movies[movieIndex].isSeen =
      !updatedWatchList.movies[movieIndex].isSeen;
    setSelectedWatchlist(updatedWatchList);
    updateWatchLists(updatedWatchList);
  };
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showValidNameAlert, setShowValidNameAlert] = useState(false);
  const updateWatchlistTitle = (title) => {
    const updatedWatchList = { ...selectedWatchlist };
    updatedWatchList.title = title;
    updateWatchLists(updatedWatchList);
    setSelectedWatchlist(updatedWatchList);
  };
  const updateWatchLists = (updatedWatchList) => {
    const listIndex = watchLists.findIndex(
      (list) => list.title === selectedWatchlist.title
    );
    const updatedWatchlists = [...watchLists];
    updatedWatchlists[listIndex] = updatedWatchList;
    setWatchLists(updatedWatchlists);
    localStorage.setItem("watchLists", JSON.stringify(updatedWatchlists));
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {showValidNameAlert && (
        <p style={{ color: `${themeRed}` }}>
          Please provide a valid email ID!!!
        </p>
      )}
      <h2>
        {!isEditEnabled && selectedWatchlist.title}
        {isEditEnabled && (
          <input
            type="email"
            placeholder={selectedWatchlist.title}
            onBlur={(e) => {
              if (e.target.value) {
                updateWatchlistTitle(e.target.value);
                setShowValidNameAlert(false);
              } else {
                setShowValidNameAlert(true);
              }
              setIsEditEnabled(false);
            }}
            onMouseOut={() => {
              setShowValidNameAlert(false);
              setIsEditEnabled(false);
            }}
            className="inputField"
          />
        )}
        <FontAwesomeIcon
          icon={faEdit}
          style={{ marginInline: "10px" }}
          onClick={() => setIsEditEnabled(!isEditEnabled)}
        />
      </h2>
      <h4>About this watchlist</h4>
      <p>{selectedWatchlist.description}</p>
      <div className="posters">
        {selectedWatchlist.movies?.length > 0 &&
          selectedWatchlist.movies.map((movie, index) => (
            <div key={index} className="poster">
              {renderCheckMark(movie)}
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
  );
};

export default WatchList;
