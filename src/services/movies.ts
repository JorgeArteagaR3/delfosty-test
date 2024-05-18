import { ICatalog } from "../types/movies";
import axios from "axios";

const mockApiUrl = "/db/movies.json";

export const getCatalog = async () => {
  const res = await axios.get(mockApiUrl);
  return res.data as Promise<ICatalog>;
};
