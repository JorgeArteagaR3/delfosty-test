import { IMovie } from "../types/movies";
import MovieCard from "./MovieCard";
import { useMovies } from "../context/MoviesContext";
import Skeleton from "./ui/Skeleton";

type MovieListProps = {
  movies: IMovie[];
};
export default function MovieList({ movies }: MovieListProps) {
  const { loading, error } = useMovies();

  if (error) {
    return (
      <div>
        <p>Oops! there was an error!: {error}</p>
      </div>
    );
  }

  if (loading)
    return (
      <div className="movies-container">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton width={"100%"} height={"30rem"} key={i} />
        ))}
      </div>
    );

  return (
    <div className="movies-container">
      {movies?.length === 0 && <div>No movies found</div>}
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
