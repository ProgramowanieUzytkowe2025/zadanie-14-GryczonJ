import "./MovieList.css";

function MovieCard({ movie, onDelete }) {
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

      <button className="delete-btn" onClick={() => onDelete(movie.id)}>Usuń</button>
    </div>
  );
}

export default MovieCard;
