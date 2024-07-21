import { Router } from "express";
import {
  likeReview,
  removeLikeReview,
} from "../controllers/like.controller.ts";
import {
  createReview,
  deleteReview,
  editReview,
  getReview,
  getReviewsByBusinessId,
} from "../controllers/review.controller.ts";

const router = Router();

router.get("/business/:businessId", getReviewsByBusinessId);
router.post("/business/:businessId", createReview);
router.get("/:reviewId", getReview);
router.patch("/:reviewId", editReview);
router.delete("/:reviewId", deleteReview);
router.post("/:reviewId/like", likeReview);
router.delete("/:reviewId/like", removeLikeReview);

export default router;
