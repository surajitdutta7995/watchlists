import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import WatchList from "./WatchList";
import { useSelector } from "react-redux";

const Home = () => {
  const { selectedWatchlist } =
    useSelector((state) => state);
  return (
    <>
      <LeftSection />
      {selectedWatchlist ? <WatchList /> : <RightSection />}
    </>
  );
};
export default Home;
