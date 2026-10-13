import { Router } from "express";
import { findBooks } from "../controllers/books/findBooks.js";
import { findBooksById } from "../controllers/books/findBookById.js";

const router = new Router();

router.get('/', findBooks);
router.get('/:id', findBooksById);

export default router;