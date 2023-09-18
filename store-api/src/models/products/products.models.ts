import { Client } from "../../env";
import { Response_Message,Response } from "../../interfaces/customer/return.interfaces";
import { Product } from "../../interfaces/products/products.interface";


export class ProductsModel {
  async getAllProducts(): Promise<Response<Product[]> | Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      return { status: 200, message: "get all products successfully", data: result.rows };
    } catch (error) {
      return { status: 500, message: `get all products failed: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }

  async getProductByName(searchTerm: string, limit: number|string = 20): Promise<Response<Product[]> | Response_Message> {
    let conn;
    limit = typeof limit === "string" ? parseInt(limit): limit
    try {
      conn = await Client.connect();
      const sql = `
        SELECT * FROM products
        WHERE title ILIKE $1 OR description ILIKE $1
        LIMIT $2
      `;
      const result = await conn.query(sql, [`%${searchTerm}%`, limit]);
      return { status: 200, message: "get products by name successfully", data: result.rows };
    } catch (error) {
      return { status: 500, message: `get products by name failed: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }
  
  async getProductById(id: string): Promise<Response<Product | undefined> | Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const result = await conn.query(sql, [id]);
      return {
        status: 200,
        message: result.rows.length ? "get product by id successfully" : "product not found",
        data: result.rows[0],
      };
    } catch (error) {
      return { status: 500, message: `get product by id failed: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }

  async filterProducts(filters: Record<string, any> = {}): Promise<Response<Product[]> | Response_Message> {
    let conn;

    try {
      conn = await Client.connect();
  
      // Construct the base query for filtering products
      const baseQuery = `
        SELECT * FROM products
        WHERE 1 = 1
      `;
  
      // Generate the final query with optional filter conditions
      const filter = applyFilters(baseQuery, filters);
  

      // Execute the filtered query
      const result = await conn.query(filter.finalQuery,filter.filterValues);
  
      return { status: 200, message: "Products filtered successfully", data: result.rows };
    } catch (error) {
      return { status: 500, message: `Filtering products failed: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }

  async createProduct(product: Product): Promise< Response<{productId:number}>|Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const id = crypto.randomUUID()
      const {
        title,
        description,
        price,
        discount_percentage,
        rating,
        stock_quantity,
        brand,
        category,
        thumbnail,
        images,
      } = product;

      const sql = `
        INSERT INTO products
        (id,title, description, price, discount_percentage, rating, stock_quantity, brand, category, thumbnail, images)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)
        RETURNING id;
      `;

      const values = [
        id,
        title,
        description,
        price,
        discount_percentage,
        rating,
        stock_quantity,
        brand,
        category,
        thumbnail,
        images,
      ];

      const result = await conn.query(sql, values);
      const productId = result.rows[0].id;

      return { status: 200, message: "Product created successfully", data: { productId } };
    } catch (error) {
      return { status: 500, message: `Create product failed: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }

  async updateProductById(id: string, updatedProduct: Partial<Product>): Promise<Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const query = `
        UPDATE products
        SET title = COALESCE($2, title),
            description = COALESCE($3, description),
            price = COALESCE($4, price),
            discount_percentage = COALESCE($5, discount_percentage),
            rating = COALESCE($6, rating),
            stock_quantity = COALESCE($7, stock_quantity),
            brand = COALESCE($8, brand),
            category = COALESCE($9, category),
            thumbnail = COALESCE($10, thumbnail),
            images = COALESCE($11, images)
        WHERE id = $1
      `;
      const values = [
        id,
        updatedProduct.title,
        updatedProduct.description,
        updatedProduct.price,
        updatedProduct.discount_percentage,
        updatedProduct.rating,
        updatedProduct.stock_quantity,
        updatedProduct.brand,
        updatedProduct.category,
        updatedProduct.thumbnail,
        updatedProduct.images,
      ];

      await conn.query(query, values);
      return { status: 200, message: "update product by id successfully" };
    } catch (error) {
      return { status: 500, message: `update product by id failed: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }

  async deleteProduct(productId: string): Promise<Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const deleteSql = `
        DELETE FROM products
        WHERE id = $1
      `;
      await conn.query(deleteSql, [productId]);
      return { status: 200, message: "Product deleted successfully" };
    } catch (error) {
      return { status: 500, message: `Failed to delete product: ${error}` };
    } finally {
      try {
        if (conn) {
          conn.release();
        }
      } catch (releaseError) {
        console.error(`Error releasing connection: ${releaseError}`);
      }
    }
  }

  
}



function applyFilters(baseQuery: string, filters: Record<string, any>): { finalQuery: string; filterValues: any[] } {
  const filterConditions = [];
  const filterValues = [];

  // Conditionally add filter conditions based on filter criteria
  if (filters.price !== undefined) {
    filterConditions.push(`price <= $${filterValues.length + 1}`);
    filterValues.push(filters.price);
  }

  if (filters.discountPercentage !== undefined) {
    filterConditions.push(`discount_percentage >= $${filterValues.length + 1}`);
    filterValues.push(filters.discountPercentage);
  }

  if (filters.rating !== undefined) {
    filterConditions.push(`rating >= $${filterValues.length + 1}`);
    filterValues.push(filters.rating);
  }

  if (filters.stockQuantity !== undefined) {
    filterConditions.push(`stock_quantity >= $${filterValues.length + 1}`);
    filterValues.push(filters.stockQuantity);
  }

  if (filters.brand !== undefined) {
    filterConditions.push(`brand ILIKE $${filterValues.length + 1}`);
    filterValues.push(`%${filters.brand}%`);
  }

  if (filters.category !== undefined) {
    filterConditions.push(`category ILIKE $${filterValues.length + 1}`);
    filterValues.push(`%${filters.category}%`);
  }

  // Include the limit parameter
  if (filters.limit !== undefined) {
    filterConditions.push(`LIMIT $${filterValues.length + 1}`);
    filterValues.push(filters.limit);
  }

  // Include the searchTerm parameter
  if (filters.searchTerm !== undefined) {
    filterConditions.push(`title ILIKE $${filterValues.length + 1}`);
    filterValues.push(`%${filters.searchTerm}%`);
  }

  // Join the filter conditions together with "AND" to create the filter clause
  const filterClause = filterConditions.length > 0 ? `AND ${filterConditions.join(' AND ')}` : '';

  // Append the filter clause to the base query
  const finalQuery = `${baseQuery} ${filterClause}`;

  return { finalQuery, filterValues };
}
