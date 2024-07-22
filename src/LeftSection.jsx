import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faHome,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { themeRed } from "./ThemeConstants";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsUserLoggedIn,
  setLoggedInUser,
  setSelectedWatchlist,
} from "./appStateSlice";
import "./LeftSection.css";

const LeftSection = () => {
  const { loggedinUser, watchLists } = useSelector((state) => state);
  const dispatch = useDispatch();
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
          onClick={() => dispatch(setSelectedWatchlist(null))}
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
                dispatch(setSelectedWatchlist(list));
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
              dispatch(setLoggedInUser(""));
              dispatch(setIsUserLoggedIn(false));
              dispatch(setSelectedWatchlist(null));
              setShowLogoutOption(false);
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
