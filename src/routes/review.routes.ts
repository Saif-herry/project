import { Router } from "express";
import { RatingController } from "../controllers";

export default class ReviewRoutes {
  public router: Router;
  private reviewController: RatingController;
  public path = "review";
  constructor() {
    this.router = Router();
    this.reviewController = new RatingController();
    this.routes();
  }

  private routes() {
    this.router.post("/create-review", this.reviewController.createReview);
    this.router.put("/update-review/:id", this.reviewController.updateReview);
    this.router.delete(
      "/delete-review/:id",
      this.reviewController.deleteReview
    );
    this.router.get("/get-all-review", this.reviewController.getAllReview);
  }
}
