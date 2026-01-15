import React, { useEffect, useState } from "react";

const API_KEY = "2f27f8bf";

const MovieModal = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError("Movie details not found.");
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!imdbID) return null;

  const poster =
    movie?.Poster !== "N/A"
      ? movie?.Poster
      : "https://via.placeholder.com/400x600?text=No+Image";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>

        {loading && <p>Loading movie details...</p>}
        {error && <p>{error}</p>}

        {movie && (
          <>
            <img src={poster} alt={movie.Title} />
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p>{movie.Plot}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
