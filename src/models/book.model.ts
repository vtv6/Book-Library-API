import { Document, model, Schema, Types } from "mongoose";
import Category from "./category.model";

interface IBook extends Document {
  name: string;
  bought: number;
  author: string;
  image: string;
  description: string;
  categories: Types.ObjectId[];
  price: number;
  chapters: string[];
}

const BookSchema = new Schema({
  name: { type: String, required: true },
  bought: { type: Number, default: 0 },
  author: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array, required: true, default: [] },
  price: { type: Number, required: true, default: 0 },
  chapters: { type: Array, required: true, default: [] },
});

BookSchema.pre<IBook>("save", function (next) {
  if (!this.isNew) return next();
  this.categories.forEach((categoryId) => {
    Category.findByIdAndUpdate(categoryId, { $inc: { count: 1 } }, { new: true })
      .then((category) => {
        console.log(`[addBook] ${category?.name} has ${category?.count} books`);
        next();
      })
      .catch((err) => {
        console.log("[addBook] err");
        next(err);
      });
  });
});

const Book = model<IBook>("books", BookSchema);

export default Book;
