import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/edit/:id" element={<MovieForm editMode={true} />} />
        <Route path="/add" element={<MovieForm editMode={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
