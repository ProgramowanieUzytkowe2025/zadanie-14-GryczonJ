// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchMovie, updateMovie } from "../api/moviesApi";


// function MovieEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMovie(id)
//       .then(data => {
//         setMovie(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError("Nie udało się pobrać filmu: " + err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;
//       setMovie(prev => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // czyścimy poprzedni błąd

//     try {
//       await updateMovie(id, movie); // wywołanie PUT w API
//       navigate("/"); 
//     } catch (err) {
//       // Wyświetlamy błąd pod formularzem
//       setError(err.message || "Wystąpił nieznany błąd");
//     }
//   };

//   if (loading) return <p>Ładowanie filmu...</p>;

//   return (
//     <div>
//       <h2>Edytuj film</h2>

//       {error && (
//         <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Tytuł:</label>
//           <input
//             type="text"
//             name="tytul"
//             value={movie.tytul}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Gatunek:</label>
//           <input
//             type="text"
//             name="gatunek"
//             value={movie.gatunek}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Ilość egzemplarzy:</label>
//           <input
//             type="number"
//             name="ile_egzemplarzy"
//             value={movie.ile_egzemplarzy}
//             onChange={handleChange}
//             required
//             // min={1} // minimalna wartość w formularzu
//           />
//         </div>

//         <div>
//           <label>Dostępny do wypożyczenia:</label>
//           <input
//             type="checkbox"
//             name="dostepny_do_wypozyczenia"
//             checked={movie.dostepny_do_wypozyczenia}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" style={{ marginTop: "1rem" }}>
//           Zapisz zmiany
//         </button>
//       </form>
//     </div>
//   );
// }

// export default MovieEdit;
