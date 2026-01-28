from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from models import Movie
from schemas import MovieRead, MovieCreate, MovieUpdate
from database import get_db

from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import time

from fastapi import Query
import logging
logger = logging.getLogger(__name__)


app = FastAPI(
    title="Wypożyczalnia Filmów API",
    description="Usługa REST CRUD na pojedynczej tabeli 'filmy'."
)

app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://127.0.0.1:5500"],  # adres Twojego frontendu (Live Server)
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE itp.
    allow_headers=["*"],
)

# --- CREATE ---
@app.post("/filmy/", response_model=MovieRead, status_code=status.HTTP_201_CREATED, tags=["Filmy"])
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    db_movie = Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

# --- READ ALL ---
# @app.get("/filmy/", response_model=List[MovieRead], tags=["Filmy"])
# def read_movies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return db.query(Movie).offset(skip).limit(limit).all()'
# @app.get("/filmy/", response_model=List[MovieRead], tags=["Filmy"])
# def read_movies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     """Odczytuje listę filmów."""
    
#     # 💡 KOREKTA: DODANIE KLAUZULI ORDER BY (sortowanie po ID)
#     movies = (
#         db.query(Movie)
#         .order_by(Movie.id)  # Wymagane przez MS SQL przy użyciu OFFSET/LIMIT
#         .offset(skip)
#         .limit(limit)
#         .all()
#     )
#     return movies

# --- READ ONE ---
# @app.get("/filmy/{movie_id}", response_model=MovieRead, tags=["Filmy"])
# def read_movie(movie_id: int, db: Session = Depends(get_db)):
#     movie = db.query(Movie).filter(Movie.id == movie_id).first()
#     if not movie:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Film nie został znaleziony")
#     return movie
@app.get("/filmy/{movie_id}", response_model=MovieRead, tags=["Filmy"])
def read_movie(movie_id: int, db: Session = Depends(get_db)):
    print(f"Fetching movie with ID: {movie_id}")
    print(f"Database session: {db}")
    # Dodaj opóźnienie tutaj:
    time.sleep(5)
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Film nie został znaleziony")
    return movie

# @app.get("/filmy/", response_model=List[MovieRead], tags=["Filmy"])
# def read_movies(
#     skip: int = 0,
#     limit: int = 100,
#     dostepny: Optional[bool] = None,  # nowy parametr do filtrowania
#     db: Session = Depends(get_db)
# ):
#     query = db.query(Movie)

#     if dostepny is not None:
#         query = query.filter(Movie.dostepny_do_wypozyczenia == dostepny)

#     movies = query.order_by(Movie.id).offset(skip).limit(limit).all()
#     return movies

@app.get("/filmy/", response_model=List[MovieRead], tags=["Filmy"])
def read_movies(
    skip: int = 0,
    limit: int = 100,
    dostepny: Optional[str] = Query(None, description="true/false"),
    db: Session = Depends(get_db)
):
    query = db.query(Movie)

    if dostepny is not None:
        if dostepny.lower() == "true":
            query = query.filter(Movie.dostepny_do_wypozyczenia == 1)
        elif dostepny.lower() == "false":
            query = query.filter(Movie.dostepny_do_wypozyczenia == 0) 
        else:
            raise HTTPException(status_code=400, detail="Niepoprawny parametr dostepny")

    query = query.order_by(Movie.id)

    if skip or limit:
        
        query = query.offset(skip).limit(limit)

    return query.all()
    

# --- UPDATE ---
@app.put("/filmy/{movie_id}", response_model=MovieRead, tags=["Filmy"])
def update_movie(movie_id: int, movie: MovieUpdate, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    
    if not db_movie:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Film nie został znaleziony")
    
    update_data = movie.dict(exclude_unset=True)

    if "ile_egzemplarzy" in update_data and update_data["ile_egzemplarzy"] <= 0:
        raise HTTPException(
            status_code=400,
            detail="Liczba egzemplarzy musi być większa od zera"
        )
    
    for key, value in update_data.items():
        setattr(db_movie, key, value)
    db.commit()
    db.refresh(db_movie)
    return db_movie

# --- DELETE ---
@app.delete("/filmy/{movie_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Filmy"])
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    
    if not db_movie:
        raise HTTPException(status_code=404, detail="Film nie został znaleziony w bazie danych")

    # REALIZACJA PUNKTU 8b: Blokada usuwania rekordów z wartością false
    if db_movie.dostepny_do_wypozyczenia == False:
        raise HTTPException(
            status_code=400, 
            detail="Nie można usunąć filmu, który ma status: Niedostępny (wymóg biznesowy API)."
        )

    db.delete(db_movie)
    db.commit()
    return {}

