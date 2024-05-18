import { useMovies } from "../context/MoviesContext";

export default function SearchInput() {
  const { setSearchValue } = useMovies();
  return (
    <input
      type="text"
      placeholder="Search by name or description..."
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}
