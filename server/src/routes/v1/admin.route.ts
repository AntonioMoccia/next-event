import { Router } from "express";
import { AdminController } from "@controllers/v1/admin.controller";

import { wrap } from "@lib/wrapAsync";

const router = Router()
const adminController = new AdminController()
const adminWrap= wrap(adminController)


router.get('/events',adminWrap(adminController.getAdminEvents))


export default router