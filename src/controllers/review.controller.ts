import { aggregationHelper } from "../helper/aggPagination.helper";
import { MovieSchema, ReviewSchema } from "../models";
import { NextFunction, Response } from "express";

class RatingController {
  async createReview(req: any, res: Response, next: NextFunction) {
    try {
      const movieId = req?.query?.movieId;
      const { yourName, message, rating } = req?.body;

      const data = await ReviewSchema.create({
        movieId,
        yourName,
        message,
        rating,
      });

      res.json({
        status: "SUCCESS",
        message: "Successfully add review",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateReview(req: any, res: Response, next: NextFunction) {
    try {
      const id = req?.params?.id;
      const { yourName, message, rating } = req?.body;

      const data = await ReviewSchema.findByIdAndUpdate(
        id,
        {
          yourName,
          message,
          rating,
        },
        { new: true }
      );

      res.json({
        status: "SUCCESS",
        message: "Successfully update review",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteReview(req: any, res: Response, next: NextFunction) {
    try {
      const id = req?.params?.id;
      const data = await ReviewSchema.findByIdAndDelete({ _id: id });
      res.json({
        status: "SUCCESS",
        message: "Successfully delete review",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllReview(req: any, res: Response, next: NextFunction) {
    const movieId = req?.params?.id;

    const { perPage, pageNo } = req?.query;
    const data = await aggregationHelper({
      model: MovieSchema,
      perPage: perPage ? Number(perPage) : undefined,
      pageNo: pageNo ? Number(pageNo) : undefined,
      args: [
        {
          $sort: {
            createdAt: -1,
          },

          $lookup: {
            from: "Review",
            localField: "_id",
            foreignField: "movieId",
            as: "reviewData",
          },
        },
      ],
    });
  }
}

export default RatingController;
