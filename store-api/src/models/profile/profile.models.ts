import { Client } from "../../env";
import { CreateProfileDto } from "../../interfaces/profile/create-profile.dto";
import { Response_Message,Response } from "../../interfaces/customer/return.interfaces";
import { UUID } from "crypto";

export class ProfilesModel {
  async getProfileData(userId: UUID): Promise<Response<CreateProfileDto>|Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = "SELECT * FROM profiles WHERE customer_id = $1";
      const result = await conn.query(sql, [userId]);
  
      if (result.rows.length === 1) {
        // Found a profile for the given user ID
        return { status: 200, message: "get profile data successfully", data: result.rows[0] };
      } else {
        // No profile found for the given user ID
        return { status: 404, message: "profile not found" };
      }
    } catch (error) {
      return { status: 500, message: `get profile data failed: ${error}` };
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

  async editUserProfile(userId: UUID, updatedProfileData: Partial<CreateProfileDto>): Promise<Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
  
      // Update the profile data
      const updateProfileSql = `
      UPDATE profiles
      SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        gender = COALESCE($4, gender),
        age = COALESCE($5, age),
        country = COALESCE($6, country),
        city = COALESCE($7, city),
        address = COALESCE($8, address),
        phone = COALESCE($9, phone),
        date_of_birth = COALESCE($10, date_of_birth),
        post_code = COALESCE($11, post_code)
      WHERE customer_id = $12
    `;
    await conn.query("BEGIN");

    await conn.query(updateProfileSql, [
      updatedProfileData.first_name,
      updatedProfileData.last_name,
      updatedProfileData.email,
      updatedProfileData.gender,
      updatedProfileData.age,
      updatedProfileData.country,
      updatedProfileData.city,
      updatedProfileData.address,
      updatedProfileData.phone,
      updatedProfileData.date_of_birth,
      updatedProfileData.post_code,
      userId
    ]);
    await conn.query("COMMIT");
    
      return { status: 200, message: "profile updated successfully" };
    } catch (error) {
      // Rollback the transaction in case of an error
      if (conn) {
        await conn.query("ROLLBACK");
      }
      return { status: 500, message: `edit profile failed: ${error}` };
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
  
  async setProfileImage(userId: UUID, imageData: string): Promise<Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      // Update the profile with the new image data
      const updateImageSql = `
        UPDATE profiles
        SET profile_image = $1
        WHERE customer_id = $2
      `;


      await conn.query(updateImageSql, [imageData, userId]);

      return { status: 200, message: "profile image updated successfully" };
    } catch (error) {
      return { status: 500, message: `set profile image failed: ${error}` };
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

  async changeProfileImage(userId: UUID, newImageData: string): Promise<Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      // Update the profile image with the new image data

      const updateImageSql = `
        UPDATE profiles
        SET profile_image = $1
        WHERE customer_id = $2
      `;

      await conn.query("BEGIN");

      await conn.query(updateImageSql, [newImageData, userId]);

      await conn.query("COMMIT");
      return { status: 200, message: "profile image changed successfully" };
    } catch (error) {
      // Rollback the transaction in case of an error
      if (conn) {
        await conn.query("ROLLBACK");
      }
      return { status: 500, message: `change profile image failed: ${error}` };
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

  async deleteProfile(userId: UUID): Promise<Response_Message> {
    let conn;
    try {
      conn = await Client.connect();
      const deleteProfileSql = "DELETE FROM profiles WHERE customer_id = $1";
      const deleteUserSql = "DELETE FROM customers WHERE id = $1";
  
      // Start a transaction
      await conn.query("BEGIN");
  
      // Delete the profile
      await conn.query(deleteProfileSql, [userId]);
  
      // Delete the corresponding user (assuming user deletion is required)
      await conn.query(deleteUserSql, [userId]);
  
      // Commit the transaction
      await conn.query("COMMIT");
  
      return { status: 200, message: "profile deleted successfully" };
    } catch (error) {
      if (conn) {
        await conn.query("ROLLBACK");
      }
      return { status: 500, message: `delete profile failed: ${error}` };
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