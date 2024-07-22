import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faHome,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { themeRed } from "./ThemeConstants";
import AppContext from "./AppContext";
import "./LeftSection.css";

const LeftSection = () => {
  const {
    loggedinUser,
    setLoggedInUser,
    setIsUserLoggedIn,
    watchLists,
    setSelectedWatchlist,
  } = useContext(AppContext);
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [watchListToRender, setWatchListToRender] = useState([...watchLists]);
  const updateWatchListToRender = () => {
    setWatchListToRender(
      searchParam
        ? watchLists.filter((list) => list.title.includes(searchParam))
        : [...watchLists]
    );
  };
  useEffect(() => {
    updateWatchListToRender();
  }, [watchLists, searchParam]);
  return (
    <div className="leftSection">
      <div className="listSearch">
        <h1 style={{ color: themeRed }}>Watchlists</h1>
        <input
          type="text"
          placeholder=" Search "
          className="searchWatchList"
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
        />
        <button
          className="home"
          onClick={() => {
            setSelectedWatchlist(null);
          }}
        >
          <FontAwesomeIcon icon={faHome} style={{ color: "#fff" }} />
          Home
        </button>
      </div>
      <div className="myListsContainer">
        <h4>My Lists</h4>
        {watchListToRender.length > 0 &&
          watchListToRender.map((list, index) => (
            <button
              className="watchList"
              key={index}
              onClick={() => {
                setSelectedWatchlist(list);
              }}
            >
              {list.title}
            </button>
          ))}
      </div>
      <div className="userSection">
        {showLogoutOption && (
          <button
            className="logout"
            onClick={() => {
              setLoggedInUser("");
              setIsUserLoggedIn(false);
              setShowLogoutOption(false);
              setSelectedWatchlist(null);
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        )}
        <div className="userControls">
          <FontAwesomeIcon icon={faCircleUser} />
          <span>{loggedinUser ? loggedinUser : "User"}</span>
          <FontAwesomeIcon
            icon={faEllipsis}
            onClick={() => setShowLogoutOption(!showLogoutOption)}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
