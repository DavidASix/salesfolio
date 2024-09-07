import { Document, Types } from "mongoose";

export type TimeUnit = "ms" | "s" | "m" | "h" | "d";
export type Duration = `${number} ${TimeUnit}` | `${number}${TimeUnit}`;
export type FAQ = { question: string; answer: string }[];
export type FormattedError = { message: string; code: number };

export interface Outreach extends Document {
  userId: Types.ObjectId;
  type: "call" | "email" | "creative";
  description: string;
  emailSubject?: string;
  emailBody?: string;
  imageUrl?: string;
  audioFileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
