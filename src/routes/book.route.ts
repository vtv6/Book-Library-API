import { Router } from "express";
import {
  addBook,
  addChapter,
  getAllBook,
  getAllChapterByBookId,
  getBook,
  getChapter,
  getLastRead,
  getNewBooks,
  getOwnBook,
  getRecommeded,
} from "../controllers/book.controller";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const bookRoute = Router();

bookRoute.get("/all", authenticateToken, getAllBook);

bookRoute.post("/add", addBook);

bookRoute.get("/new", authenticateToken, getNewBooks);

bookRoute.get("/top", authenticateToken, getRecommeded);

bookRoute.get("/own", authenticateToken, getOwnBook);

bookRoute.get("/lastread", authenticateToken, getLastRead);

bookRoute.post("/addchapter", addChapter);

bookRoute.get("/chapter/:id", authenticateToken, getChapter);

bookRoute.get("/chapters/:id", authenticateToken, getAllChapterByBookId);

bookRoute.get("/:id", authenticateToken, getBook);

export default bookRoute;
