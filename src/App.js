import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import "./App.css";

const API_KEY = " 2f27f8bf";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    if (!query) return;

    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

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
