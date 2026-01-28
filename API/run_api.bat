@echo off
set "PYTHON_PATH=D:\konda\envs\lab-pu\python.exe"

echo Sprawdzanie interpretera Pythona...
if exist "%PYTHON_PATH%" (
    echo Uzywam Pythona ze srodowiska lab-pu.
) else (
    echo BLAD: Nie znaleziono Pythona w %PYTHON_PATH%
    echo Sprawdz sciezke do srodowiska!
    pause
    exit
)

echo.
echo Sprawdzanie lokalizacji pliku main.py...
if exist main.py (
    echo Plik main.py znaleziony. Uruchamiam API...
    "%PYTHON_PATH%" -m uvicorn main:app --reload
) else (
    echo ======================================================
    echo BLAD: Nie znaleziono pliku main.py w %cd%
    dir /b
    echo ======================================================
)

echo.
echo Serwer zostal zatrzymany.
cmd /k