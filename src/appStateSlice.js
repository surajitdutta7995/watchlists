import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  loggedinUser: "",
  watchLists: [],
  showAddTowatchListModal: false,
  selectedMovie: {},
  selectedWatchlist: null,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedinUser = action.payload;
    },
    setWatchLists: (state, action) => {
      state.watchLists = action.payload;
    },
    setShowAddTowatchListModal: (state, action) => {
      state.showAddTowatchListModal = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setSelectedWatchlist: (state, action) => {
      state.selectedWatchlist = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsUserLoggedIn,
  setLoggedInUser,
  setWatchLists,
  setShowAddTowatchListModal,
  setSelectedMovie,
  setSelectedWatchlist,
} = appStateSlice.actions;

export default appStateSlice.reducer;
