import { Request, Response } from "express";
import { ProductsModel } from "../../models/products/products.models";

const products = new ProductsModel()

export default class ProductController {
  async getAllProducts(req:Request,res:Response){
    const getAllProducts = await products.getAllProducts()
    if("data" in getAllProducts) {
      res.status(200).json(getAllProducts)
    }else {
      res.status(getAllProducts.status).json(getAllProducts)
    }
  }

  async getProductByName(req:Request,res:Response){
    const searchTerm = req.params.name 
    const limit = req.query.limit as string;
    const getProductByName = await products.getProductByName(searchTerm,limit)
    if("data" in getProductByName) {
      res.status(200).json(getProductByName)
    }else {
      res.status(getProductByName.status).json(getProductByName)
    }
  }

  async getProductById(req:Request,res:Response){
    let {id} = req.params
    const getProductById = await products.getProductById(id)
    if("data" in getProductById) {
      res.status(200).json(getProductById)
    }else {
      res.status(getProductById.status).json(getProductById)
    }
  }

  async filterProducts(req:Request,res:Response){ 
    const filters = req.query as Record<string, any>
    const filterProducts = await products.filterProducts(filters)
    if("data" in filterProducts) {
      res.status(200).json(filterProducts)
    }else {
      res.status(filterProducts.status).json(filterProducts)
    }
  }

  async createProduct(req:Request,res:Response){ 
    const {product} = req.body
    const createProduct = await products.createProduct(product)
    if("data" in createProduct) {
      res.status(200).json(createProduct)
    }else {
      res.status(createProduct.status).json(createProduct)
    }
  }
  
  async updateProductById(req:Request,res:Response){ 
    const {id} = req.params
    const {product} = req.body
    const updateProductById = await products.updateProductById(id,product)
    if("data" in updateProductById) {
      res.status(200).json(updateProductById)
    }else {
      res.status(updateProductById.status).json(updateProductById)
    }
  }

  async deleteProduct(req:Request,res:Response){ 
    const {id} = req.params
    const deleteProduct = await products.deleteProduct(id)
    if("data" in deleteProduct) {
      res.status(200).json(deleteProduct)
    }else {
      res.status(deleteProduct.status).json(deleteProduct)
    }
  }
}