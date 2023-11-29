import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";
import { getVariation } from "../controllers/Cable/Getvariation.js";
import { Buycable } from "../controllers/Cable/Buycable.js";
import { Verifycable } from "../controllers/Cable/Verifycable.js";
router.post("/api/v2/getVariation", ValidateToken, getVariation)
router.post("/api/v2/buycable", ValidateToken, Buycable)
router.post("/api/v2/verifycable", ValidateToken, Verifycable)

export { router as cableRoute };