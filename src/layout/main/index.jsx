import { useEffect, useState } from "react";
import Movies from "../../components/card-list";
import Preloader from "../../components/preloader";
import Search from "../../components/search";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchMovies = (searchValue, type = "all") => {
    setLoading(true);
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${searchValue}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=matrix`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Search searchMovies={searchMovies} />
      {!loading ? (
        <Movies movies={movies} />
      ) : (
        <div className="center">
          <Preloader />
          <h3>Loading...</h3>
        </div>
      )}
    </main>
  );
};

export default Main;
