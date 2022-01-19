import express from "express";
import InventoryCtrl from "./inventory.controller.js"
import ChangeCtrl from "./change.controller.js"

const router = express.Router();

router.route("/").get(InventoryCtrl.apiGetInventory);

router
    .route("/change")
    .post(ChangeCtrl.apiPost)
    .put(ChangeCtrl.apiUpdate)
    .delete(ChangeCtrl.apiDelete);

export default router;