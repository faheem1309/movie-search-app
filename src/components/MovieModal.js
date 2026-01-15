import React, { useEffect, useState } from "react";

const API_KEY = " 2f27f8bf";

const MovieModal = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imdbID) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <p>Loading movie details...</p>
        ) : (
          <>
            <button className="close-btn" onClick={onClose}>✖</button>
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p className="plot">{movie.Plot}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
