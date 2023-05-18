import express, { Router } from "express";
import {register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpres } from "../middlewares/validationResultExpress.js";


const router = Router();

router.post("/register",register);


//router.get("/tutoriales", tutoriales);

export default router;
