import React from "react";

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;