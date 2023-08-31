import { AuthCredentialsDto } from "../../interfaces/customer/auth/auth-credentials.dto";
import  {Client,JWT_SECRET,REFRESH_JWT_SECRET,PEPPER}  from "../../env";
import { Customer,Response_Message,Response,Token } from "../../interfaces/customer/customer";
import jwt  from "jsonwebtoken";
import { CreateProfileDto } from "../../interfaces/customer/profile/create-profile.dto";
import { UUID } from "crypto";
export class CustomerAuthCredentials{


  async getAllCustomers(): Promise<Response<Customer[]>|Response_Message> {
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
  
  
  async signUp(AuthCredentialsDto:AuthCredentialsDto, profileData: Partial<CreateProfileDto>): Promise<Response_Message> {
    let conn;
    const {username, password} = AuthCredentialsDto
    try {
      conn = await Client.connect();
      const customer_id = crypto.randomUUID()
      const profile_id = crypto.randomUUID()
      // Start a transaction
      await conn.query("BEGIN");
  
      // Step 1: Insert a new customer
      const insertCustomerSql = `
        INSERT INTO customers (id,username, password)
        VALUES ($1,$2, $3)`;
      const customerResult = await conn.query(insertCustomerSql, [customer_id,username, password]);
      // Step 2: Insert a new profiles with the customer_id as a foreign key
      const insertProfileSql = `
        INSERT INTO profiles (id,customer_id, first_name, last_name, email, gender, age, country, city, address, phone, date_of_birth, post_code, profile_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14)
      `;
      await conn.query(insertProfileSql, [
        profile_id,
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
        profileData.profile_image
      ]);
      const setProfileIdSql = `
      UPDATE  customers 
      SET profile_id = $1
      WHERE id = $2`;
      const set = await conn.query(setProfileIdSql, [profile_id,customer_id]);
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
  
  
  
  async signIn(username:string, password:string):Promise<Response_Message|Response<Token>> {
    let conn;

    try {
      conn = await Client.connect(); 
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
      
      const res = {
        token: jwt.sign({ payload: customer.id + PEPPER }, JWT_SECRET, { expiresIn: "15m" }), 
        refresh_token: jwt.sign({ payload: customer.id + PEPPER }, REFRESH_JWT_SECRET, { expiresIn: "7d" }), 
      };
      return { status: 200,message: "Authentication successful", data: res };
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
  
  
  async getAuthenticatedCustomer(id: UUID):Promise<Response<Customer>|Response_Message> {
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


  async deleteCustomer(id: UUID): Promise<Response_Message> {
    let conn; 
    try {
      conn = await Client.connect(); 
      const checkCustomerSql = `
        SELECT * FROM customers
        WHERE id = $1;
      `;
      const result = await conn.query(checkCustomerSql, [id]);

      if (result.rows.length === 0) {
        throw new Error('customer not found');
      }
      const deleteSql = `
        DELETE FROM customers
        WHERE id = $1;
      `;
      await conn.query(deleteSql, [id]);
      return {status:200,message:`delete customer successfully`}
    } catch (error) {
      return {status:500,message:`Failed to delete customer: ${error}`}
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