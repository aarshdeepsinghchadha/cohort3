import mongoose, { Date, mongo, Schema } from "mongoose";

export interface ContentDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  type: "document" | "tweet" | "youtube";
  link: string;
  title: string;
  tags: string[];
  share: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<ContentDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["document", "tweet", "youtube"],
      required: true,
    },
    link: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    share: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Content = mongoose.model<ContentDocument>(
  "Content",
  ContentSchema
);
