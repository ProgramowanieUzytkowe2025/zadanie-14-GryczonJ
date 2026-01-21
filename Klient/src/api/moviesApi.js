const API_URL = "http://127.0.0.1:8000/filmy/";

// --- GET: lista filmów ---

export async function fetchMovies(dostepny) {
  let url = API_URL;
  if (dostepny !== undefined) {
    url += `?dostepny=${dostepny}`;
  }
  console.log("Fetch URL:", url);

  const response = await fetch(url);
  if (!response.ok) throw new Error("Błąd przy pobieraniu filmów");
  return await response.json();
}

export async function fetchMovie(id) {
  const response = await fetch(`${API_URL}+${id}`);
  console.log("Fetching movie with id:", id);

  if (!response.ok) {
    throw new Error("Nie udało się pobrać filmu: " + response.statusText);
  }
  return await response.json();
}

// --- POST: dodanie nowego filmu ---
export async function createMovie(movie) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Błąd przy tworzeniu filmu");
  }

  return response.json();
}

// --- PUT: aktualizacja filmu ---
export async function updateMovie(id, movie) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Błąd przy aktualizacji filmu");
  }

  return response.json();
}

// --- DELETE: usunięcie filmu ---
export async function deleteMovie(id) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Błąd przy usuwaniu filmu");
  }

  return true;
}
