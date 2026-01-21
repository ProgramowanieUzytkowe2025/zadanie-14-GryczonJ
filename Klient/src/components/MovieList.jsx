import { useEffect, useState } from "react";
import { fetchMovies, deleteMovie } from "../api/moviesApi";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter(movie => movie.id !== id)); // usuwa z listy po stronie UI
    } catch (err) {
      alert("Nie udało się usunąć filmu: " + err.message);
    }
  };
 
  useEffect(() => {
    fetchMovies()
      .then(data => setMovies(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  return (
  <div>
    <h2>Lista filmów</h2>

    <p>Łączna liczba filmów: {movies.length}</p>

    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
      ))}
    </div>
  </div>
);
}

export default MovieList;
