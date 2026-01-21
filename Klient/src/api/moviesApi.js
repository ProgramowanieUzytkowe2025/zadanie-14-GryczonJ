const API_URL = "http://127.0.0.1:8000/filmy/";

// --- GET: lista filmów ---
export async function fetchMovies(skip = 0, limit = 100) {
  const response = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Błąd pobierania filmów");
  }
  return response.json();
}

// --- GET: jeden film po ID ---
export async function fetchMovie(id) {
  const response = await fetch(`${API_URL}${id}`);
  if (!response.ok) {
    throw new Error("Film nie został znaleziony");
  }
  return response.json();
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
