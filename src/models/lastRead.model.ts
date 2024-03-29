import { Document, model, Schema, Types } from "mongoose";

interface ILastRead extends Document {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  reading: number;
  updateAt: Date;
  createAt: Date;
}

const LastReadSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true },
    bookId: { type: Types.ObjectId, required: true },
    reading: { type: Number, required: true, default: 0 },
  },
  { timestamps: { updatedAt: "updateAt" } }
);

LastReadSchema.index({ userId: 1, bookId: 1 });

const LastRead = model<ILastRead>("lastread", LastReadSchema);
export default LastRead;
