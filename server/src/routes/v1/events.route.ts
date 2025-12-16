import { EventsController } from "@controllers/v1/events.controller";
import { wrap } from "@lib/wrapAsync";
import { authMiddelware } from "@middelwares/authMiddelware";
import { Router } from "express";

const router = Router();
const eventsController = new EventsController();
const eventsWrap = wrap(eventsController);


router.delete("/upload", eventsWrap(eventsController.removeImageFromCloud));
router.post("/upload", eventsWrap(eventsController.uploadImageGetSignedUrl));

router.post("/", eventsWrap(eventsController.createEvent));

router.get("/", eventsWrap(eventsController.getEvents));
router.get("/mine", authMiddelware, eventsWrap(eventsController.getUserEvents));

//ADMIN ROUTE
router.put("/:id", eventsWrap(eventsController.updateEvent));
router.get("/:id", eventsWrap(eventsController.getEventById));

export default router;
