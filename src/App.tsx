import MovieList from "./components/MovieList";
import { useMovies } from "./context/MoviesContext";
import GenreList from "./components/GenreList";
import SearchInput from "./components/SearchInput";

export default function App() {
  const { catalog, getFilteredMovies } = useMovies();

  return (
    <>
      <section>
        <SearchInput />
      </section>
      <section>
        <h2 className="section-title">Genres</h2>
        <GenreList genres={catalog?.genres} />
      </section>
      <main>
        <h2 className="section-title">Catalog</h2>
        <MovieList movies={getFilteredMovies()} />
      </main>
    </>
  );
}
