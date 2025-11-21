import { CategoryService } from "@/services/category.service";
import { Category } from "@/types/index";
import { success } from "@/lib/send-success";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }
  async creteCategory(req: Request, res: Response, next: NextFunction) {
    const { description }: Category = req.body;
    const categoryService = new CategoryService({ description });
    try {
      const newCategory = await categoryService.create();

      success(res, {
        category: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategories(req: Request, res: Response, next: NextFunction) {
    const categoryService = new CategoryService();

    try {
      const categories = await categoryService.getAll();
      return success(res, { categories });
    } catch (error) {
      next(error);
    }
  }
}
