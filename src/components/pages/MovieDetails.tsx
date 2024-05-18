import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard";
import { useMovies } from "../../context/MoviesContext";
import Skeleton from "../ui/Skeleton";
import { useMemo } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const { getMovieById, loading, error } = useMovies();

  const movie = useMemo(
    () => getMovieById(parseInt(id || "")),
    [id, getMovieById]
  );

  if (loading)
    return (
      <div className="movie-details-container">
        <Skeleton height={"25rem"} width={"500px"} />
      </div>
    );

  if (error) return <div>Oops! there was an error</div>;

  if (!movie) return null;

  return (
    <div className="movie-details-container">
      <MovieCard movie={movie} />
    </div>
  );
}
