import { Schema, model } from "mongoose";
import { io } from "../config/sockets.ts";
import { updateBusinessRating } from "../controllers/business.controller.ts";
import type { IReview } from "../types/reviewTypes.ts";

const reviewSchema = new Schema<IReview>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

reviewSchema.index({ businessId: 1, userId: 1 }, { unique: true });

reviewSchema.post("findOneAndUpdate", async (doc) => {
  try {
    await updateBusinessRating(doc.businessId);
    io.to(doc.businessId.toString())
      .to(doc.userId.toString())
      .emit("editReview", doc);
  } catch (error) {}
});

reviewSchema.post("save", async (doc) => {
  try {
    await updateBusinessRating(doc.businessId.toString());
    io.to(doc.businessId.toString())
      .to(doc.userId.toString())
      .emit("addReview", doc);
  } catch (error) {}
});

reviewSchema.post("findOneAndDelete", async (doc) => {
  try {
    await updateBusinessRating(doc.businessId);
    io.to(doc.businessId.toString())
      .to(doc.userId.toString())
      .emit("deleteReview", doc);
  } catch (error) {}
});

const Review = model<IReview>("Review", reviewSchema);
export default Review;
