import React, { useContext, useState } from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import AppContext from "./AppContext";
import WatchList from "./WatchList";

const Home = (props) => {
  const { selectedWatchlist } =
  useContext(AppContext);
  return (
    <>
      <LeftSection/>
      {selectedWatchlist ? <WatchList/> : <RightSection/>}
    </>
  );
};
export default Home;
