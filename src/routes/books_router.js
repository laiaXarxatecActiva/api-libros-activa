import { Router } from "express";
import { findBooks, findBookById } from "../controllers/bookController.js";

const router = new Router();

router.get('/', findBooks);
router.get('/:id', findBookById);

export default router;