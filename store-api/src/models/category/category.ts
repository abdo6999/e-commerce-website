import { Client } from "../../env";

export class categoryModel {
  
  async getAllCategory(){
    let conn;
    try {
      conn = await Client.connect();
      const sql = "SELECT * FROM categories";
      const result = await conn.query(sql);
      return {status:200,message:"get all categories successfully",data:result.rows};
    } catch (error) {
      return { status: 500, message: `get all categories failed: ${error}` };
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