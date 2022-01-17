import express from "express";
import InventoryCtrl from "./inventory.controller.js"

const router = express.Router();

router.route("/").get(InventoryCtrl.apiGetInventory);

export default router;