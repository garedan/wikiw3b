import { Router } from "express";
import { redirectLink } from "../controllers/redirect.controller.js";
const router = Router()

router.get('/:tutoriales', redirectLink);

export default router;