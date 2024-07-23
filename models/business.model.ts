import { Schema, model } from "mongoose";
import { io } from "../config/sockets.ts";
import type { IBusiness } from "../types/businessTypes.ts";

const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true, unique: true },
  about: { type: String, required: true },
  category: { type: [String], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  avgRating: { type: Number, required: true, default: 0 },
});

businessSchema.post("findOneAndUpdate", async (doc) => {
  io.emit(doc._id.toString(), doc);
});

const Business = model<IBusiness>("Business", businessSchema);
export default Business;
