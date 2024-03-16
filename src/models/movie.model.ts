import { model, Model, Schema } from "mongoose";
import { MOVIE_TYPE } from "../types";

const movieSchema = new Schema<MOVIE_TYPE, Model<MOVIE_TYPE>>({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
});

const MovieSchema = model<MOVIE_TYPE, Model<MOVIE_TYPE>>("Movie", movieSchema);

export default MovieSchema;
