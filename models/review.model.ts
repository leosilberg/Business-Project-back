import { Schema, model } from "mongoose";
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

const Review = model<IReview>("Review", reviewSchema);
export default Review;
