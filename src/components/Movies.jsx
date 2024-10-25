import { useState, useEffect, useContext } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";
import { WatchListContext } from "../context/WatchListContext";

function Movies() {
  const tdmb_api_key = import.meta.env.VITE_TMDB_API_KEY;
  //console.log(tdmb_api_key);
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const { watchList, addToWatchList, removeFromWatchList } =
    useContext(WatchListContext);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${tdmb_api_key}&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        //console.log(response.data.results);
        setMovies(response.data.results);
      });
  }, [pageNo]);

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handlePrevious = () => {
    if (pageNo == 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };
  return (
    <div>
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>
      <div className="flex justify-evenly flex-wrap gap-8">
        {movies.map((movie, index) => {
          return (
            <MovieCard
              movie={movie}
              key={index}
              addToWatchlist={addToWatchList}
              watchlist={watchList}
              removeFromWatchlist={removeFromWatchList}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}

export default Movies;
