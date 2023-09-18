import { Client } from "../env";
import fs from "node:fs"
import { Product } from "../interfaces/products/products.interface";
import { AuthCredentialsDto } from "../interfaces/customer/auth/auth-credentials.dto";
import { CreateProfileDto } from "../interfaces/profile/create-profile.dto";
import { CustomersModel } from "../models/customer/customer.models";
import { resolve } from "node:path";


const readProductData = fs.readFileSync(resolve("./data/products.json"), 'utf8');
const productData:Product[] = JSON.parse(readProductData);
const readUserData = fs.readFileSync(resolve("./data/user.json"), 'utf8');
const userData = JSON.parse(readUserData);
const customer = new CustomersModel()


const authCredentialsArray:AuthCredentialsDto[] = userData.map((user: any) => {
  const { email, password } = user;
  return { username:email, password };
});

const createProfileArray:CreateProfileDto[] = userData.map((user: any) => {
  const {
    first_name,
    last_name,
    gender,
    age,
    country,
    address,
    city,
    state,
    phone,
    post_code,
    profile_image,
    email,
  } = user;
  let {date_of_birth} = user
  const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
  const dateOfBirth = date_of_birth;

  if(dateOfBirthPattern.test(dateOfBirth)){
    const dateParts = dateOfBirth.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; 
    const day = parseInt(dateParts[2], 10);
    date_of_birth = new Date(year, month, day);
  }
  return {
    first_name,
    last_name,
    gender,
    age,
    country,
    address,
    city,
    state,
    phone,
    date_of_birth,
    post_code,
    profile_image,
    email,
  };
});

async function insertProductData() {
  let conn;
  try {
    conn = await Client.connect();

    // Create an array of value arrays for the multiple rows
    const values = productData.map((product) => [
      product.title,
      product.description,
      product.price,
      product.discount_percentage,
      product.rating,
      product.stock_quantity,
      product.brand,
      product.category,
      product.thumbnail,
      product.images,
    ]);

    // SQL query with multiple rows insertion
    const query = `
      INSERT INTO products(title, description, price, discount_percentage, rating, stock_quantity, brand, category, thumbnail, images)
      VALUES ${values
        .map(
          (_, index) =>
            `($${index * 10 + 1}, $${index * 10 + 2}, $${index * 10 + 3}, $${
              index * 10 + 4
            }, $${index * 10 + 5}, $${index * 10 + 6}, $${index * 10 + 7}, $${
              index * 10 + 8
            }, $${index * 10 + 9}, $${index * 10 + 10})`
        )
        .join(", ")}
    `;

    // Flatten the values array and execute the query
    const flattenedValues = values.flat();
    await Client.query(query, flattenedValues);

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await conn?.release();
  }
}
async function insertUserData() {
  try {
    authCredentialsArray.map(async (val,i)=>{
      const res = await customer.signUp(val,createProfileArray[i])
      console.log(res.message)
    })
  } catch (error) {
    console.log(error)
  }
}
insertProductData();
insertUserData();