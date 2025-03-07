import express from "express";
import { getAllKids, getKidById, addKid, updateKidSessions, deleteKid } from "../controllers/kidController.js";

const router = express.Router();

router.route("/").get(getAllKids).post(addKid);
router.route("/:id").get(getKidById).put(updateKidSessions).delete(deleteKid);

export default router;
