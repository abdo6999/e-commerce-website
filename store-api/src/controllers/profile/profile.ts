import { Response } from "express";
import { CreateProfileDto } from "../../interfaces/profile/create-profile.dto"; // Import your DTO model
import { ProfilesModel } from "../../models/profile/profile.models"; // Import your ProfilesModel
import { AuthenticatedRequest } from "../../middleware/authenticate";

const profiles = new ProfilesModel();



export default class ProfileController {
  async getProfileData(req: AuthenticatedRequest, res: Response) {
    const userId  = req.customer_id;
    if(userId){
      const profileData = await profiles.getProfileData(userId);
      if ("data" in profileData) {
        res.status(200).json(profileData);
      } else {
        res.status(profileData.status).json(profileData);
      }
    }else {
      res.status(401).json({message:"unauthorized"})
    }
  }

  async editUserProfile(req: AuthenticatedRequest, res: Response) {
    const  userId  = req.customer_id;
    const updatedProfileData = req.body as Partial<CreateProfileDto>;
    if(userId){
      const editProfile = await profiles.editUserProfile(userId, updatedProfileData);
      if ("data" in editProfile) {
        res.status(200).json(editProfile);
      } else {
        res.status(editProfile.status).json(editProfile);
      }
    }else {
      res.status(401).json({message:"unauthorized"})
    }

  }

  async setProfileImage(req: AuthenticatedRequest, res: Response) {
    const  userId  = req.customer_id;
    const imageData = req.body.imageData as string;
    if(userId){
      const setResult = await profiles.setProfileImage(userId, imageData);
      if ("data" in setResult) {
        res.status(200).json(setResult);
      } else {
        res.status(setResult.status).json(setResult);
      }

    } else {
      res.status(401).json({message:"unauthorized"})
    }

  }

  async changeProfileImage(req: AuthenticatedRequest, res: Response) {
    const  userId  = req.customer_id;
    const newImageData = req.body.newImageData as string;
    if(userId){
      const changeResult = await profiles.changeProfileImage(userId, newImageData);

      if ("data" in changeResult) {
        res.status(200).json(changeResult);
      } else {
        res.status(changeResult.status).json(changeResult);
      }
    } else {
      res.status(401).json({message:"unauthorized"})
    }

  }

  async deleteProfile(req: AuthenticatedRequest, res: Response) {
    const  userId  = req.customer_id;
    if(userId){
      const deleteResult = await profiles.deleteProfile(userId);
      if ("data" in deleteResult) {
        res.status(200).json(deleteResult);
      } else {
        res.status(deleteResult.status).json(deleteResult);
      }
    } else {
      res.status(401).json({message:"unauthorized"})
    }

  }
}
