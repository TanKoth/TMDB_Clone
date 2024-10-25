import { createContext, useEffect, useState } from "react";

const WatchListContext = createContext();

export default function WatchListContextWrapper({ children }) {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"));
    if (moviesFromLocalStorage) {
      setWatchList(moviesFromLocalStorage);
    }
  }, []);
  const addToWatchList = (movie) => {
    const updatedWatchlist = [...watchList, movie];
    setWatchList(updatedWatchlist);
    localStorage.setItem("movies", JSON.stringify(updatedWatchlist));
  };
  //console.log(watchlist);

  const removeFromWatchList = (movie) => {
    const removeUpdatedWatchlist = watchList.filter(
      (movieList) => movieList.id !== movie.id
    );
    setWatchList(removeUpdatedWatchlist);
    localStorage.setItem("movies", JSON.stringify(removeUpdatedWatchlist));
  };
  return (
    <WatchListContext.Provider
      value={{ addToWatchList, removeFromWatchList, watchList, setWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

export { WatchListContext };
