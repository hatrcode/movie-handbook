import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="item-card" key={movie.id}>
      <img
        className="item-img"
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
        alt={movie.title}
      />
      <div>
        <h3 className="item-title">{movie.title}</h3>
        <div className="item-info">
          <p>
            <small>Release date: {movie.release_date}</small>
          </p>
          <p>
            <small>Rating: {movie.vote_average}</small>
          </p>
          {/* <p className="card--desc">{movie.overview}</p> */}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
