import React from "react";
import Movie from "./Movie";
const MovieList = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {props.movies.map((movie, i) => {
            return (
              <Movie
                key={movie.id}
                viewMovieInfo={props.viewMovieInfo}
                movieId={movie.id}
                title={movie.title}
                overview={movie.overview}
                image={movie.poster_path}
                date={movie.release_date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
