import React, { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";
import "./Loader.css";

const Loader = () => {
  const { loading } = useContext(LoaderContext);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-text">Wczytywanie...</div>
    </div>
  );
};

export default Loader;
