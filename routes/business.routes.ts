import { Router } from "express";
import {
  createBusiness,
  deleteBusiness,
  editBusiness,
  getBusiness,
  getBusinesses,
} from "../controllers/business.controller.ts";

const router = Router();

router.get("/", getBusinesses);
router.get("/:businessId", getBusiness);
router.post("/", createBusiness);
router.patch("/:businessId", editBusiness);
router.delete("/:businessId", deleteBusiness);

export default router;
