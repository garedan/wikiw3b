import { Router } from "express";
import {
  getTutoriales,
  createTutoriales,
  getTutorial,
  deleteTutorial,
} from "../controllers/link.controller.js";


const router = Router();

router.get("/", getTutoriales);
router.get("/:title", getTutorial);
router.post("/", createTutoriales);
router.delete("/:title", deleteTutorial);

export default router;
