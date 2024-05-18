import Movies from "../../db/movies.json";

export type ICatalog = typeof Movies;

export type IMovie = ICatalog["movies"][number];
