import type { Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  description: string;
  phone: string;
  email: string;
}
