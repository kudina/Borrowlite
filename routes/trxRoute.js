import  express from "express";
const router = express.Router();
import { ValidateToken } from "../middleware/ValidateToken.js";
import { getTransactionByUser } from "../controllers/Tranasactions/GetTransactionByUser.js";
import { paybackAmount } from "../controllers/Tranasactions/Payback.js";
import { chargeBack } from "../controllers/Tranasactions/ChargeBack.js";
import { BorrowCheckRef } from "../controllers/BorrowCheckRef.js";


router.get("/api/v2/gettrx", ValidateToken, getTransactionByUser)
router.post("/api/v2/payback", ValidateToken, paybackAmount)
router.post("/api/v2/chargeback", ValidateToken, chargeBack)
router.post("/api/v2/checkref", ValidateToken, BorrowCheckRef)

export { router as trxRoute };