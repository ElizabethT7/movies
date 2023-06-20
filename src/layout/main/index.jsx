import React from 'react';
import Movies from '../../components/Movies';
import Preloader from '../../components/Preloader';
import Search from '../../components/Search';

class Main extends React.Component {
  state = {
    movies: [],
  }

  componentDidMount() {
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=36fd8c75&s=matrix')
      .then(response => response.json())
      .then(data => this.setState({movies: data.Search}))
  }

  render() {
    const { movies } = this.state;
    return (
      <main className="container content">
        <Search />
        {
          movies.length ? 
          <Movies movies={this.state.movies} />
          :
          <div className="center">
            <Preloader />
            <h3>Loading...</h3>
          </div>
        }
        
      </main>
    )
  }
}

export default Main;