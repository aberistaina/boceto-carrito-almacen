import { Router } from "express";
import { viewHome, viewProductosCrud, loginRegistro } from "../controllers/views.controllers.js";
import { verifyToken  } from "../middlewares/login.middlewares.js";

const router = Router()

router.get(["/", "home"], viewHome)
router.get(["/productosCrud"], viewProductosCrud)
router.get(["/login"], loginRegistro)

export default router