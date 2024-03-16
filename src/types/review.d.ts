import { Document } from "mongoose";
import MOVIE_TYPE from "./movie";

export default interface REVIEW_TYPE extends Document {
  movieId: MOVIE_TYPE;
  yourName: string;
  message: string;
  rating: number;
}
