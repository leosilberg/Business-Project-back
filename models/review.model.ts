import { Schema, model } from "mongoose";
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

reviewSchema.post("findOneAndUpdate", async (doc) => {
  await updateBusinessRating(doc.businessId);
});

reviewSchema.post("save", async (doc) => {
  await updateBusinessRating(doc.businessId.toString());
});

reviewSchema.post("findOneAndDelete", async (doc) => {
  await updateBusinessRating(doc.businessId);
});

const Review = model<IReview>("Review", reviewSchema);
export default Review;
