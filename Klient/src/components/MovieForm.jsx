import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie, updateMovie, createMovie } from "../api/moviesApi";
import { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";
import { toast } from "react-toastify";

function MovieForm({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    tytul: "",
    gatunek: "",
    ile_egzemplarzy: 1,
    dostepny_do_wypozyczenia: true
  });
  const [loading, setLoading] = useState(editMode);
  const [error, setError] = useState("");
  const { showLoader, hideLoader } = useContext(LoaderContext);

  useEffect(() => {
    if (editMode) {
      fetchMovie(id)
        .then(data => {
          setMovie(data);
          setLoading(false);
        })
        .catch(err => {
          setError("Nie udało się pobrać filmu: " + err.message);
          setLoading(false);
        });
    }
  }, [editMode, id]);

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movie.ile_egzemplarzy < 1) {
      toast.error("Liczba egzemplarzy musi być większa niż 0");
      return;
    }

    try {
      if (editMode) {
        await updateMovie(id, movie, { showLoader, hideLoader });
        // await updateMovie(id, movie);
        toast.success("Poprawnie zapisano zmiany");
      } else {
        await createMovie(movie);
        toast.success("Film dodany pomyślnie");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Wystąpił błąd: " + (err.message || ""));
    }
  };

  if (loading) return <p>Ładowanie filmu...</p>;

  return (
    <div>
      <h2>{editMode ? "Edytuj film" : "Dodaj nowy film"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tytuł:</label>
          <input
            type="text"
            name="tytul"
            value={movie.tytul}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gatunek:</label>
          <input
            type="text"
            name="gatunek"
            value={movie.gatunek}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Ilość egzemplarzy:</label>
          <input
            type="number"
            name="ile_egzemplarzy"
            value={movie.ile_egzemplarzy}
            onChange={handleChange}
            required
            // min={1}
          />
        </div>

        <div>
          <label>Dostępny do wypożyczenia:</label>
          <input
            type="checkbox"
            name="dostepny_do_wypozyczenia"
            checked={movie.dostepny_do_wypozyczenia}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          {editMode ? "Zapisz zmiany" : "Dodaj film"}
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
