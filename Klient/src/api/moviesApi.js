// import { useContext } from "react";
// import { LoaderContext } from "../contexts/LoaderContext";

export const API_URL = "http://127.0.0.1:8000/filmy/";

// helper fetch z loaderem
async function apiFetch(url, options = {}, loaderContext) {
  try {
    loaderContext?.showLoader();
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Błąd w zapytaniu API: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } finally {
    loaderContext?.hideLoader();
  }
}

// --- GET: lista filmów ---
export async function fetchMovies(dostepny, loaderContext) {
  let url = API_URL;
  if (dostepny !== undefined) {
    url += `?dostepny=${dostepny}`;
  }
  console.log("Fetch URL:", url);
  return apiFetch(url, {}, loaderContext);
}

// --- GET: jeden film ---
export async function fetchMovie(id, loaderContext) {
  console.log("Fetching movie with id:", id);
  return apiFetch(`${API_URL}${id}`, {}, loaderContext);
}

// --- POST: dodanie nowego filmu ---
export async function createMovie(movie, loaderContext) {
  return apiFetch(
    API_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    },
    loaderContext
  );
}

// --- PUT: aktualizacja filmu ---
export async function updateMovie(id, movie, loaderContext) {
  return apiFetch(
    `${API_URL}${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    },
    loaderContext
  );
}

// --- DELETE: usunięcie filmu ---
export const deleteMovie = async (id) => {
  const response = await fetch(`http://localhost:8000/filmy/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Wystąpił nieznany błąd");
  }
  return true;
};
