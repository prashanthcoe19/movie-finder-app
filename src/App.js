import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import MovieInfo from "./components/MovieInfo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      totalResults: 0,
      searchTerm: "",
      currentPage: 1,
      currentMovie: null
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  //  const [movies, setMovies]=useState([])
  // const [toalResults, settotalResults]=useState(0)
  // const [searchTerm, setsearchTerm]=useState(" ")
  // const [currentPage, setCurrentPage]=useState(1)
  // const [currentMovie, setMovies]=useState([])

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  logData = () => {
    console.log(process.env.REACT_APP_API);
  };

  handleSubmit = e => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&language=en-US&page=${this.state.currentPage}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results
        });
      });

    e.preventDefault();
  };

  nextPage = pageNumber => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&language=en-US&page=${pageNumber}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results,
          currentPage: pageNumber
        });
      });
  };

  viewMovieInfo = id => {
    let filteredMovie;
    this.state.movies.forEach((movie, i) => {
      if (movie.id == id) {
        filteredMovie = movie;
      }
    });

    this.setState({ currentMovie: filteredMovie });
  };

  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  };

  render() {
    let numberPages = Math.floor(this.state.totalResults / 20);
    return (
      <div>
        <Nav />

        {this.state.currentMovie == null ? (
          <div>
            <SearchBox
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <MovieList
              viewMovieInfo={this.viewMovieInfo}
              movies={this.state.movies}
            />
          </div>
        ) : (
          <MovieInfo
            closeMovieInfo={this.closeMovieInfo}
            currentMovie={this.state.currentMovie}
          />
        )}
        {this.state.totalResults > 20 && this.state.currentMovie == null ? (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
