import { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
  const tdmb_api_key = import.meta.env.VITE_TMDB_API_KEY;
  const [bannerImage, setBannerImage] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${tdmb_api_key}&language=en-US&page=1`
      )
      .then((response) => {
        //console.log("Films:", response.data.results);
        const firstMovie = response.data.results[0];
        const firstMovieTitle = firstMovie.title;
        const firstMoviePoster = firstMovie.backdrop_path;
        setTitle(firstMovieTitle);
        setBannerImage(
          `https://image.tmdb.org/t/p/original/${firstMoviePoster}`
        );
      });
  }, []);

  return (
    <div>
      <div
        className="h-[40vh] w-full md:h-[75vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="text-white w-full text-center text-2xl">{title}</div>
      </div>
    </div>
  );
}

export default Banner;
