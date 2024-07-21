import { Schema, model } from "mongoose";
import type { ILike } from "../types/likeTypes.ts";

const likeSchema = new Schema<ILike>({
  reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Like = model<ILike>("Like", likeSchema);
export default Like;
