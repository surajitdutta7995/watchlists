import { useState, createContext, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import LoginModal from "./LoginModal";
import { textColor } from "./ThemeConstants";
import { createPortal } from "react-dom";
import AppContext from "./AppContext";
import AddToWatchListModal from "./AddToWatchListModal";

// const AppContext = createContext(null);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedinUser, setLoggedInUser] = useState("");
  const [watchLists, setWatchLists] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [showAddTowatchListModal, setShowAddTowatchListModal] = useState(false);
  const contextValue = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    loggedinUser,
    setLoggedInUser,
    watchLists,
    setWatchLists,
    showAddTowatchListModal,
    setShowAddTowatchListModal,
    selectedMovie,
    setSelectedMovie,
    selectedWatchlist,
    setSelectedWatchlist,
  };
  useEffect(() => {
    if (
      localStorage.getItem("watchLists") &&
      JSON.parse(localStorage.getItem("watchLists"))?.length &&
      isUserLoggedIn
    ) {
      setWatchLists((prevState) => {
        return localStorage.getItem("watchLists") !== prevState &&
          localStorage.getItem("watchLists")
          ? JSON.parse(localStorage.getItem("watchLists"))
          : [];
      });
    } else {
      setWatchLists([]);
    }
  }, [isUserLoggedIn]);
  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Home />
        {!isUserLoggedIn &&
          createPortal(<LoginModal />, document.querySelector("#root"))}
        {showAddTowatchListModal &&
          createPortal(
            <AddToWatchListModal />,
            document.querySelector("#root")
          )}
      </div>
    </AppContext.Provider>
  );
}
