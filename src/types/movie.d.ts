import { Document } from "mongoose";

export default interface MOVIE_TYPE extends Document {
  name: string;
  releaseDate: string;
}
