import { useEffect, useState } from "react";
import { fetchMovies, deleteMovie } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  

 const loadMovies = async (filterValue) => {
  setLoading(true);
  let dostepny;
  console.log("Filtr:", filterValue, " -> dostepny:", dostepny);

  if (filterValue === "true") dostepny = true;
  else if (filterValue === "false") dostepny = false;
  else dostepny = undefined;

  try {
    const data = await fetchMovies(dostepny);
    setMovies(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadMovies(filter);
  }, [filter]);


 const handleDelete = async (id, dostepny) => {
    if (dostepny === false) {
      toast.error("Nie można usunąć niedostępnego filmu!");
      return;
    }

    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten film?");
    if (!confirmDelete) return;

    try {
      await deleteMovie(id);
      setMovies(movies.filter(movie => movie.id !== id));
      toast.success("Poprawnie usunięto film!");
    } catch (err) {
      toast.error("Wystąpił błąd przy usuwaniu filmu!");
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
     <button style={{ marginBottom: "1rem" }} onClick={() => navigate("/add")}>Dodaj nowy film </button>
    
    
    <p>Łączna liczba filmów: {movies.length}</p>
    <div style={{ marginBottom: "1rem" }}>
        <label>Filtruj po dostępności: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Wszystkie</option>
          <option value="true">Tylko dostępne</option>
          <option value="false">Tylko niedostępne</option>
        </select>
      </div>

      {loading ? (
        <p>Ładowanie filmów...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      )}
    
      {/* <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
        ))}
      </div> */}
      
  </div>
);
}

export default MovieList;
