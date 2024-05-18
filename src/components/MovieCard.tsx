import { Link } from "react-router-dom";
import { IMovie } from "../types/movies";

type MovieCardProps = {
  movie: IMovie;
};

const genreColors = {
  Crime: "#ff0054",
  Action: "#6DB1BF",
  Drama: "#FFBD00",
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={"" || "/images/movie-poster-placeholder.svg"}
        alt="movie poster placeholder"
      />
      <p className="movie-card__title">{movie.title}</p>
      <p className="movie-card__description">{movie.description}</p>
      <p
        className="movie-card__genre"
        style={{
          background: genreColors[movie.genre as keyof typeof genreColors],
        }}
      >
        {movie.genre}
      </p>
    </Link>
  );
}
