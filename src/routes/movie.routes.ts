import { Router } from "express";
import { MovieController } from "../controllers";

export default class MovieRoutes {
  public router: Router;
  private movieController: MovieController;
  public path = "movie";
  constructor() {
    this.router = Router();
    this.movieController = new MovieController();
    this.routes();
  }

  private routes() {
    this.router.post("/create-movie", this.movieController.createMovie);
    this.router.put("/update-movie/:id", this.movieController.updateMovie);
    this.router.get("/get-movie-by-id", this.movieController.getMovieById);
    this.router.get("/get-all-movie", this.movieController.getAllMovie);
    this.router.get(
      "/get-all-movies",
      this.movieController.getAllMovieWithoutSearch
    );
  }
}
