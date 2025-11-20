import { CategoryService } from "@/services/category.service";
import { Category } from "@/types/index";
import { Request, Response } from "express";
import { REPLCommand } from "repl";

export class CategoryController {
  constructor() {}
  async creteCategory(req: Request, res: Response) {
    const { description }: Category = req.body;
    const categoryService = new CategoryService({ description });
    try {
      const newCategory = await categoryService.create();

      return res.status(201).json({
        data: {
          category: newCategory,
        },
      });
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);

      throw Error(
        "Qualcosa è andato storto nel chiamare il servizio di creazione della cateogoria"
      );
    }
  }
  async getCategories(req: Request, res: Response) {
    const categoryService = new CategoryService();

    try {
      const categories = await categoryService.getAll();
      return res.json({ data: categories });
    } catch (error) {

      return res.json({
        message:"Qualcosa è andato storto"
      })
    }
  }
}
