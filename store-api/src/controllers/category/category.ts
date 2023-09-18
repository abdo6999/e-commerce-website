import { categoryModel } from "../../models/category/category"
import { Request, Response } from "express";

const category = new categoryModel()

export class categoryController {
  async getAllCustomers(_req: Request, res: Response){
    const allCategory = await category.getAllCategory()
    if("data" in allCategory){
      res.status(200).json(allCategory)
    }else {
      res.status(allCategory.status).json(allCategory)
    }
  }
}