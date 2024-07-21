import type { Types } from "mongoose";

export interface ILike extends Document {
  reviewId: Types.ObjectId;
  userId: Types.ObjectId;
}
