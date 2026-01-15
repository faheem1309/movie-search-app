import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

const API_KEY = "2f27f8bf";

function App() {
  const [search, setSearch] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (!search) return;
    setLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1>Movie Search App</h1>

      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovies();
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
        />
        <button>Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}

export default App;
