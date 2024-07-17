import { useContext, useState } from "react";
import AppContext from "./AppContext";
import "./AddToWatchListModal.css";
import { themeRed } from "./ThemeConstants";

const AddToWatchListModal = () => {
  const {
    watchLists,
    setWatchLists,
    setShowAddTowatchListModal,
    selectedMovie,
  } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showTitleErrorText, toggleShowTitleErrorText] = useState(false);
  const [watchList, selectWatchList] = useState(watchLists ? watchLists?.[0]?.title : '');
  const options =
    watchLists &&
    watchLists.length > 0 &&
    watchLists.map((list, index) => <option key={index} value={list.title}>{list.title}</option>);
  const updateWatchLists = () => {
    let updatedWatchlists = [];
    if (title && description) {
      updatedWatchlists = [
        ...watchLists,
        {
          title: title,
          description: description,
          movies: [selectedMovie],
        },
      ];
    } else if (watchLists.find((list) => list.title === watchList)) {
      updatedWatchlists = watchLists.map((list) => {
        if (list.title === watchList) {
          list.movies.push(selectedMovie);
          return list;
        } else {
          return list;
        }
      });
    }
    localStorage.setItem("watchLists", JSON.stringify(updatedWatchlists));
    setWatchLists(updatedWatchlists);
    setTitle("");
    setDescription("");
    setShowAddTowatchListModal(false);
  };
  const createWatchList = (
    <div className="createWatchList">
      <h2>
        Create a new <span style={{ color: `${themeRed}` }}>Watchlist</span>
      </h2>
      {showTitleErrorText && <label htmlFor="name"></label>}
      <input
        type="text"
        id="name"
        name="watchlist"
        placeholder=" Title "
        onChange={(e) => {
          if (
            !watchLists ||
            !watchLists.map((list) => list.title).includes(e.target.value)
          ) {
            setTitle(e.target.value);
            toggleShowTitleErrorText(false);
          } else {
            toggleShowTitleErrorText(true);
          }
        }}
      />
      <input
        type="text"
        id="description"
        name="description"
        placeholder=" Description "
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button className="create" onClick={updateWatchLists}>
        Create Watchlist
      </button>
    </div>
  );
  return (
    <div className="addToWatchListPortal">
      <div className="addToWatchListModal">
        {watchLists && watchLists.length > 0 && (
          <div className="addToExisting">
            <label htmlFor="watchlists">
              Select the watchlist to add this movie to
            </label>
            <select
              id="watchlists"
              name="watchlists"
              className="selectWatchlist"
              onChange={(e) => {
                selectWatchList(e.target.value);
              }}
            >
              {options}
            </select>
            <button className="create" onClick={updateWatchLists}>
              Add to Watchlist
            </button>
          </div>
        )}
        {watchLists && watchLists.length > 0 && <h4>OR</h4>}
        {createWatchList}
      </div>
    </div>
  );
};

export default AddToWatchListModal;
