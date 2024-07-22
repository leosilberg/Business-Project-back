import { Router } from "express";
import {
  createBusiness,
  deleteBusiness,
  editBusiness,
  getBusiness,
  getBusinesses,
} from "../controllers/business.controller.ts";
import { getReviewsByBusinessId } from "../controllers/review.controller.ts";

const router = Router();

router.get("/", getBusinesses);
router.get("/:businessId", getBusiness);
router.post("/", createBusiness);
router.patch("/:businessId", editBusiness);
router.delete("/:businessId", deleteBusiness);
router.get("/:businessId/reviews", getReviewsByBusinessId);

export default router;
