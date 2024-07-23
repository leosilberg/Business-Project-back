import { Router } from "express";
import { getReviewsByUserId } from "../controllers/review.controller.ts";
import {
  deleteUser,
  editUser,
  getUser,
} from "../controllers/user.controller.ts";

const router = Router();

router.get("/", getUser);
router.get("/reviews", getReviewsByUserId);
router.patch("/", editUser);
router.delete("/", deleteUser);

export default router;
