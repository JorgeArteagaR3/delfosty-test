import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { type ICatalog, type IMovie } from "../types/movies";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { delay } from "../lib/utils";
import { getCatalog } from "../services/movies";

type MoviesContextProps = {
  catalog: ICatalog;
  setCatalog: Dispatch<SetStateAction<MoviesContextProps["catalog"]>>;
  genreQuery: string | null;
  getFilteredMovies: () => IMovie[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<MoviesContextProps["error"]>>;
  getMovieById: (id: number | undefined) => IMovie | null | undefined;
};

const MoviesContext = createContext<MoviesContextProps>(
  {} as MoviesContextProps
);

type MoviesProviderProps = {
  readonly children: ReactNode;
};

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [catalog, setCatalog] = useState<ICatalog>({} as ICatalog);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const genreQuery = searchParams.get("genre");

  const getFilteredMovies = useCallback(() => {
    const moviesFilteredBySearch = catalog?.movies?.filter((movie) => {
      return (
        movie.title
          .toLowerCase()
          .includes(debouncedSearch.toLocaleLowerCase()) ||
        movie.description
          .toLocaleLowerCase()
          .includes(debouncedSearch.toLocaleLowerCase())
      );
    });

    if (!genreQuery || genreQuery === "All") {
      return moviesFilteredBySearch;
    }
    return moviesFilteredBySearch?.filter(
      (movie) => movie.genre === genreQuery
    );
  }, [debouncedSearch, genreQuery, catalog.movies]);

  const getMovieById = (id: number | undefined) => {
    console.log("call");
    if (!id) return null;
    return catalog?.movies?.find((movie) => movie.id === id);
  };

  useEffect(() => {
    const getMovies = async () => {
      console.log("hello");
      try {
        setLoading(true);
        await delay(1500);
        const data = await getCatalog();
        if (data) setCatalog(data);
        setLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setLoading(false);
          setError(e.message);
        }
      }
    };
    getMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        catalog,
        setCatalog,
        genreQuery,
        getFilteredMovies,
        loading,
        setLoading,
        setSearchValue,
        error,
        setError,
        getMovieById,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
