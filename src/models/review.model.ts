import { REVIEW_TYPE } from "../types";
import { model, Model, Schema } from "mongoose";

const reviewSchema = new Schema<REVIEW_TYPE, Model<REVIEW_TYPE>>(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
    yourName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewSchema = model<REVIEW_TYPE, Model<REVIEW_TYPE>>(
  "Review",
  reviewSchema
);

export default ReviewSchema;
