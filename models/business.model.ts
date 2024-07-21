import { Schema, model } from "mongoose";
import type { IBusiness } from "../types/businessTypes.ts";

const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});
const Business = model<IBusiness>("Business", businessSchema);
export default Business;
