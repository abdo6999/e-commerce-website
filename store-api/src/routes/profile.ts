import express from "express";
import ProfileController from "../controllers/profile/profile"; 
import { authenticateToken } from "../middleware/authenticate";

const profileRouter = express.Router();
const profileController = new ProfileController();


// Get profile data for a user by ID
profileRouter.get("/",authenticateToken, profileController.getProfileData);

// Edit user profile
profileRouter.put("/",authenticateToken, profileController.editUserProfile);

// Set user profile image
profileRouter.post("/image",authenticateToken, profileController.setProfileImage)

// Change user profile image
profileRouter.put("/image",authenticateToken,profileController.changeProfileImage)

// Delete user profile
profileRouter.delete("/",authenticateToken,profileController.deleteProfile)

export default profileRouter;
