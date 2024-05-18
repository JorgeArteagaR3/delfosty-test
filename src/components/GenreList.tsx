import { Link } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";
import Skeleton from "./ui/Skeleton";

type GenreListProps = {
  genres: string[];
};

export default function GenreList({ genres }: GenreListProps) {
  const { genreQuery, loading } = useMovies();

  if (loading) {
    return (
      <div className="genres-container">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton height={"3rem"} width={"5rem"} key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="genres-container">
      <Link
        to="?genre=All"
        className={
          genreQuery === "All" || !genreQuery
            ? "selected--genre genre__btn"
            : "genre__btn"
        }
      >
        All
      </Link>
      {genres?.map((genre) => (
        <Link
          to={`?genre=${genre}`}
          key={genre}
          className={
            genreQuery === genre ? "selected--genre genre__btn" : "genre__btn"
          }
        >
          {genre}
        </Link>
      ))}
    </div>
  );
}
