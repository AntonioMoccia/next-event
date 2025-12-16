import { Router } from "express";
import { CategoriesController } from "@controllers/v1/categories.controller";
import { wrap } from "@/lib/wrapAsync";

const router = Router();
const categoriesController = new CategoriesController();
const categoriesWrapper = wrap(categoriesController);

router.post("/", categoriesWrapper(categoriesController.creteCategory));
router.get("/",categoriesWrapper(categoriesController.getCategories))

export default router