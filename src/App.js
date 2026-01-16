import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import "./App.css";

const API_KEY = "2f27f8bf";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (searchTerm) => {
    if (!searchTerm) return;
    setLoading(true);

    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  // Load default movies on first load
  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  // Live search
  useEffect(() => {
    if (query.length >= 3) {
      fetchMovies(query);
    }
  }, [query]);

  return (
    <div className="app">
      <h1>🎬 Faheem's Reel Explorer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading movies...</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSelect={setSelectedMovie}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          imdbID={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
