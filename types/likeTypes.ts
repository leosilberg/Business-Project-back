import type { Types } from "mongoose";

export interface ILike extends Document {
  review: Types.ObjectId;
  user: Types.ObjectId;
}
