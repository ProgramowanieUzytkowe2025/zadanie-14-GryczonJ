import { useEffect, useState, useContext } from "react";
import { fetchMovies, deleteMovie } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderContext } from "../contexts/LoaderContext"; // Import kontekstu

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useContext(LoaderContext); // Globalny loader

  const loadMovies = async (filterValue) => {
    showLoader(); // Włączamy globalny loader
    let dostepny;

    if (filterValue === "true") dostepny = true;
    else if (filterValue === "false") dostepny = false;
    else dostepny = undefined;

    try {
      const data = await fetchMovies(dostepny);
      setMovies(data);
    } catch (err) {
      setError(err.message);
      toast.error("Wystąpił błąd podczas pobierania filmów");
    } finally {
      hideLoader(); // Wyłączamy globalny loader
    }
  };

  // Jeden useEffect reagujący na zmianę filtra (i montowanie komponentu)
  useEffect(() => {
    loadMovies(filter);
  }, [filter]);

  const handleDelete = async (id) => {
    // Usunięto sprawdzanie "if (dostepny === false)" - pozwalamy API obsłużyć błąd
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten film?");
    if (!confirmDelete) return;

    showLoader(); // Globalny loader przy usuwaniu
    try {
      await deleteMovie(id);
      setMovies(movies.filter(movie => movie.id !== id));
      toast.success("Poprawnie usunięto film!");
    } catch (err) {
      // Wyświetli błąd, jeśli API zablokuje usunięcie (Punkt 8b)
      toast.error("Wystąpił błąd: " + (err.message || "Nie można usunąć filmu"));
    } finally {
      hideLoader();
    }
  };

  if (error) return <p>Błąd: {error}</p>;

  return (
    <div>
      <h2>Lista filmów</h2>
      <button style={{ marginBottom: "1rem" }} onClick={() => navigate("/add")}>
        Dodaj nowy film
      </button>
      
      <p>Łączna liczba filmów: {movies.length}</p>
      
      <div style={{ marginBottom: "1rem" }}>
        <label>Filtruj po dostępności: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Wszystkie</option>
          <option value="true">Tylko dostępne</option>
          <option value="false">Tylko niedostępne</option>
        </select>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;