import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import LoginModal from "./LoginModal";
import { createPortal } from "react-dom";
import AddToWatchListModal from "./AddToWatchListModal";
import { useSelector, useDispatch } from "react-redux";
import { setWatchLists } from "./appStateSlice";

export default function App() {
  const { isUserLoggedIn, watchLists, showAddTowatchListModal } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("watchLists") &&
      JSON.parse(localStorage.getItem("watchLists"))?.length &&
      isUserLoggedIn
    ) {
      dispatch(
        setWatchLists(
          localStorage.getItem("watchLists") !== watchLists &&
            localStorage.getItem("watchLists")
            ? JSON.parse(localStorage.getItem("watchLists"))
            : []
        )
      );
    } else {
      dispatch(setWatchLists([]));
    }
  }, [isUserLoggedIn]);
  return (
    <div className="App">
      <Home />
      {!isUserLoggedIn &&
        createPortal(<LoginModal />, document.querySelector("#root"))}
      {showAddTowatchListModal &&
        createPortal(<AddToWatchListModal />, document.querySelector("#root"))}
    </div>
  );
}
