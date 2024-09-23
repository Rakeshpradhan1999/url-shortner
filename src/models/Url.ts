import mongoose, { Document, Schema } from "mongoose";

export interface IUrl extends Document {
  shortCode: string;
  url: string;
  accessCount: number;
}

const urlSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    shortCode: { type: String, required: true },
    accessCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model<IUrl>("Url", urlSchema);
export default Url;
