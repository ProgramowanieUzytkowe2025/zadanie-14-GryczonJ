import "./MovieList.css";
import { useNavigate } from "react-router-dom";



function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card">
      <h3>{movie.tytul.trim()}</h3>

      <p>
        <strong>Gatunek:</strong> {movie.gatunek.trim()}
      </p>

      <p>
        <strong>Liczba egzemplarzy:</strong> {movie.ile_egzemplarzy}
      </p>

      <p>
        <strong>Dostępny:</strong>{" "}
        {movie.dostepny_do_wypozyczenia ? "Tak" : "Nie"}
      </p>
      <button className="edit-btn" onClick={() => navigate(`/edit/${movie.id}`)}> Edytuj </button>
      <button className="delete-btn" onClick={() => onDelete(movie.id, movie.dostepny_do_wypozyczenia)}> Usuń</button>
    </div>
  );
}

export default MovieCard;
