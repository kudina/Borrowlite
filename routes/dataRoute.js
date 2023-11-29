import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";
import { getVariation } from "../controllers/Data/Getvariation.js";
import { Buydata } from "../controllers/Data/Buydata.js";
router.post("/api/v2/getVariation", ValidateToken, getVariation)
router.post("/api/v2/buydata", ValidateToken, Buydata)

export { router as dataRoute };