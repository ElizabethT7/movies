import React from "react";
import Movies from "../../components/card-list";
import Preloader from "../../components/preloader";
import Search from "../../components/search";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
  };

  componentDidMount() {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=matrix`)
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  searchMovies = (searchValue, type = "all") => {
    this.setState({ loading: true });
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${searchValue}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <main className="container content">
        <Search searchMovies={this.searchMovies} />
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
  }
}

export default Main;
