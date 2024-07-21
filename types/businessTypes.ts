import type { Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  about: string;
  category: string;
  phone: string;
  email: string;
  district: string;
  city: string;
  street: string;
}
