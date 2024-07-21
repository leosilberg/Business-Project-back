import type { Document, Types } from "mongoose";

export interface IReview extends Document {
  title: string;
  description: string;
  username: string;
  rating: number;
  businessId: Types.ObjectId;
  userId: Types.ObjectId;
  likes: number;
}
