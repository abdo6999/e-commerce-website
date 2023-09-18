import { AuthCredentialsDto } from "../../interfaces/customer/auth/auth-credentials.dto";
import  {Client,JWT_SECRET,REFRESH_JWT_SECRET,PEPPER}  from "../../env";
import {Response_Message,Response, TokenAndProfileResponse } from "../../interfaces/customer/return.interfaces";
import jwt  from "jsonwebtoken";
import { CreateProfileDto } from "../../interfaces/profile/create-profile.dto";
import { UUID } from "crypto";
export class CustomersModel{


  async getAllCustomers(): Promise<Response<AuthCredentialsDto[]>|Response_Message> {
    let conn; 
    try {
      conn = await Client.connect();
      const sql = "SELECT * FROM customers";
      const result = await conn.query(sql);
      return {status:200,message:"get all customers successfully",data:result.rows};
    } catch (error) {
      return { status: 500, message: `get all customers failed: ${error}` };
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
  

  async getAuthenticatedCustomer(id: UUID):Promise<Response<AuthCredentialsDto>|Response_Message> {
    let conn;
    try {
      conn = await Client.connect(); 
      const sql = `
        SELECT * FROM customers
        WHERE id = $1;
      `;
      const result = await conn.query(sql, [id]);
      if (result.rows.length > 0) {
        return {status:200,message:"get authenticated customer successfully",data:result.rows[0]};
      } else {
        return { status: 404, message: "customer not found" };
      }
    } catch (error) {
      return { status: 500, message: `Failed to get authenticated customer: ${error}` };
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
  

  async signIn(username:string, password:string):Promise<Response_Message|Response<TokenAndProfileResponse>> {
    let conn;
    try {
      conn = await Client.connect();
      console.log(username,password)
      const sql = `
        SELECT * FROM customers
        WHERE username = $1;
      `;

      const result = await conn.query(sql, [username]);
      if (result.rows.length === 0) {
        return { status: 404, message: "customer not found" };
      }
      
      const customer = result.rows[0];
      
      if (customer.password !== password) {
        return { status: 401, message: "Unauthorized" };
      }
      
      if (!JWT_SECRET || !PEPPER || !REFRESH_JWT_SECRET) {
        return { status: 500, message: "Internal Server Error" };
      }
      const customerId = customer.id;

      const profileQuery = `
        SELECT first_name, last_name, profile_image, country
        FROM profiles
        WHERE customer_id = $1;
      `;
      const profileResult = await conn.query(profileQuery, [customerId]);
      const profileData:Partial<CreateProfileDto> = profileResult.rows[0];
      const res = {
        access_token: jwt.sign({ payload: customer.id + PEPPER }, JWT_SECRET, { expiresIn: "15m" }), 
        refresh_token: jwt.sign({ payload: customer.id + PEPPER }, REFRESH_JWT_SECRET, { expiresIn: "7d" }), 
      };
      return { status: 200,message: "Authentication successful", data: {...res, profile:profileData }};
    } catch (error) {
      return { status: 500, message: `Sign-in failed: ${error}` };
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
  
  
  async getCustomerData(id: UUID): Promise<Response<any>|Response_Message> {
    try {
      const customerPromise = this.getAuthenticatedCustomer(id);
      // const profilePromise = this.profileService.getProfileData(customer.id);
      // const cartPromise = this.cartService.getCart(customer.cartId);
      // const cartItemPromise = this.cartService.getCartItem(cart.cartItemId);
    
      // Wait for all promises to resolve simultaneously
      // const [customerResponse, profileResponse, cartResponse, cartItemResponse] = await Promise.all([
      //   customerPromise,
      //   profilePromise,
      //   cartPromise,
      //   cartItemPromise
      // ]);

      // if ('data' in customerResponse) {
      //   const customer = customerResponse.data;
      //   const customerData = {
      //   customer,
      //     profiles,
      //     cart,
      //     cartItem,
      //   };
      //   return {status:200,message:"",data:customerData};
      // }

      return {status:200,message:"get customer data successfully",data:''}
    } catch (error) {
      return { status: 500, message: `Failed to get customer data: ${error}`};
    }
  }
  

  async customerNameExists(username: string): Promise<Response<boolean>|Response_Message> {
    let conn;
    try {
      conn = await Client.connect(); 
      const sql = `
        SELECT 1
        FROM customers
        WHERE username = $1
        LIMIT 1;
      `;
      const result = await conn.query(sql, [username]);
      return {status:200,message:"is customer name exists",data:result.rows.length > 0}
    } catch (error) {
      return {status:500,message:`Failed to check username existence: ${error}`}
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

  existData() {
    const availableData = {
      totalCustomers: 0,
      totalOrders: 0,
      totalPayments: 0,
      totalInvoices: 0,
    };

    return availableData;
  }


  async signUp(AuthCredentialsDto:AuthCredentialsDto, profileData: Partial<CreateProfileDto>): Promise<Response_Message> {
    let conn;
    const {username, password} = AuthCredentialsDto
    try {
      conn = await Client.connect();
      // Start a transaction
      await conn.query("BEGIN");
  
      // Step 1: Insert a new customer
      const insertCustomerSql = `
      INSERT INTO customers (username, password)
      VALUES ($1, $2)
      RETURNING id`;
      const customerResult = await conn.query(insertCustomerSql, [username, password]);
      
      const customer_id = customerResult.rows[0].id;

      // Step 2: Insert a new profiles with the customer_id as a foreign key
      const insertProfileSql = `
      INSERT INTO profiles (customer_id, first_name, last_name, email, gender, age, country, city, address, phone, date_of_birth, post_code, profile_image, state)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
    
    await conn.query(insertProfileSql, [
      customer_id,
      profileData.first_name,
      profileData.last_name,
      profileData.email,
      profileData.gender,
      profileData.age,
      profileData.country,
      profileData.city,
      profileData.address,
      profileData.phone,
      profileData.date_of_birth,
      profileData.post_code,
      profileData.profile_image,
      profileData.state
    ]);
      // Commit the transaction
      await conn.query("COMMIT");
  
      return { status: 200, message: "customer and profile created successfully" };
    } catch (error) {
      // Rollback the transaction in case of an error
      if (conn) {
        await conn.query("ROLLBACK");
      }
      return { status: 500, message: `sign-up failed: ${error}` };
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
  
  
  

  async editCustomerCredentials(id:UUID,AuthCredentialsDto:AuthCredentialsDto){
    let conn;
    const {username, password} = AuthCredentialsDto;
    try {
      conn = await Client.connect();
      // Start a transaction
      await conn.query("BEGIN");
  
      // Step 1: Insert a new customer
      const updateCredentialsSql = `
      UPDATE customers
      SET 
        username = COALESCE($1, username),
        password = COALESCE($2, password),
      WHERE id = $3
    `;
      await conn.query(updateCredentialsSql, [username, password,id]);
      
      // Commit the transaction
      await conn.query("COMMIT");
  
      return { status: 200, message: "customers credentials changed successfully" };
    } catch (error) {
      // Rollback the transaction in case of an error
      if (conn) {
        await conn.query("ROLLBACK");
      }
      return { status: 500, message: `update credentials failed: ${error}` };
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



  async deleteCustomer(id: UUID): Promise<Response_Message> {
    let conn; 
    try {
      conn = await Client.connect();
      const deleteProfileSql = "DELETE FROM profiles WHERE customer_id = $1";
      const deleteUserSql = "DELETE FROM users WHERE id = $1";
  
      // Start a transaction
      await conn.query("BEGIN");
  
      // Delete the profile
      await conn.query(deleteProfileSql, [id]);
  
      // Delete the corresponding user (assuming user deletion is required)
      await conn.query(deleteUserSql, [id]);
  
      // Commit the transaction
      await conn.query("COMMIT");
  
      return { status: 200, message: "Customer deleted successfully" };
    } catch (error) {
      if (conn) {
        await conn.query("ROLLBACK");
      }
      return { status: 500, message: `Customer profile failed: ${error}` };
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