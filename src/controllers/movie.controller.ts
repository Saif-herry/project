import { PipelineStage } from "mongoose";
import { MovieSchema, ReviewSchema } from "../models";
import { NextFunction, Response } from "express";
import { aggregationHelper } from "../helper/aggPagination.helper";

class MovieController {
  async createMovie(req: any, res: Response, next: NextFunction) {
    try {
      const { releaseDate, name } = req?.body;
      const data = await MovieSchema.create({
        name,
        releaseDate,
      });

      res.json({
        status: "SUCCESS",
        message: "Successfully create movie",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(req: any, res: Response, next: NextFunction) {
    try {
      const id = req?.params?.id;
      const { releaseDate, name } = req?.body;
      const data = await MovieSchema.findByIdAndUpdate(
        id,
        {
          name,
          releaseDate,
        },
        { new: true }
      );
      res.json({
        status: "SUCCESS",
        message: "Successfully update movie details",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMovieById(req: any, res: Response, next: NextFunction) {
    try {
      const id = req?.query?.id;
      const data = await MovieSchema.findById({ _id: id });
      res.json({
        status: "SUCCESS",
        message: "Successfully get movie details",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMovie(req: any, res: Response, next: NextFunction) {
    try {
      const { perPage, pageNo, searchTitle } = req?.query;
      const dynamicArg: PipelineStage[] = [];

      if (searchTitle) {
        dynamicArg.push({
          $match: {
            name: new RegExp(searchTitle?.toString(), "i"),
          },
        });
      }

      const allMovie = await aggregationHelper({
        model: MovieSchema,
        perPage: perPage ? Number(perPage) : undefined,
        pageNo: pageNo ? Number(pageNo) : undefined,
        args: [
          {
            $sort: {
              createdAt: -1,
            },
          },
          ...dynamicArg, // Add dynamicArg here
        ],
      });

      res.json({
        status: "SUCCESS",
        message: "Successfully get the data",
        data: allMovie,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMovie(req: any, res: Response, next: NextFunction) {
    try {
      const id = req?.params?.id;
      const deleteMovieReview = await ReviewSchema.deleteMany({ movieId: id });

      const deleteMovie = await MovieSchema.findByIdAndDelete({ _id: id });

      res.json({
        status: "SUCCESS",
        message: "Successfully delete the movie",
        data: deleteMovie,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMovieWithoutSearch(req: any, res: Response, next: NextFunction) {
    try {
      const data = await MovieSchema.find();
      res.json({
        status: "SUCCESS",
        message: "Successfully get the all movie",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MovieController;
