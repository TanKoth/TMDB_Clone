function MovieCard({ movie, addToWatchlist, watchlist, removeFromWatchlist }) {
  const doesContain = (movie) => {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movie.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      <div className="text-white w-full text-center text-xl p-2 bg-gray-900/70 rounded-lg">
        {movie.title}
      </div>

      <div className="text-2xl">
        {doesContain(movie) ? (
          <div onClick={() => removeFromWatchlist(movie)}>✖</div>
        ) : (
          <div onClick={() => addToWatchlist(movie)}>💗</div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
