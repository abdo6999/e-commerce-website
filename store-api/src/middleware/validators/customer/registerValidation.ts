import { Request, Response, NextFunction } from 'express';
import { AuthCredentialsDto } from '../../../interfaces/customer/auth/auth-credentials.dto';
import { CreateProfileDto } from '../../../interfaces/profile/create-profile.dto';

export function validateAuthAndProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authCredentials: AuthCredentialsDto = req.body.authCredentialsDot
  const createProfile: CreateProfileDto = req.body.createProfileDot

  // Validate fields
  if (!authCredentials.username) {
    return res.status(400).json({ error: 'Invalid username is missing' });
  }

  if (!authCredentials.password) {
    return res.status(400).json({ error: 'Invalid password is missing' });
  }

  if (!createProfile.first_name) {
    return res.status(400).json({ error: 'Invalid first_name is missing' });
  }

  if (!createProfile.last_name) {
    return res.status(400).json({ error: 'Invalid last_name is missing' });
  }

  if (!createProfile.email) {
    return res.status(400).json({ error: 'Invalid email is missing' });
  }

  if (!createProfile.gender) {
    return res.status(400).json({ error: 'Invalid gender is missing' });
  }

  if (!createProfile.age) {
    return res.status(400).json({ error: 'Invalid age is missing' });
  }

  if (!createProfile.country) {
    return res.status(400).json({ error: 'Invalid country is missing' });
  }

  if (!createProfile.city) {
    return res.status(400).json({ error: 'Invalid city is missing' });
  }

  if (!createProfile.address) {
    return res.status(400).json({ error: 'Invalid address is missing' });
  }

  if (!createProfile.phone) {
    return res.status(400).json({ error: 'Invalid phone is missing' });
  }

  if (!createProfile.date_of_birth) {
    return res.status(400).json({ error: 'Invalid date_of_birth is missing' });
  }
  

  if (!createProfile.post_code) {
    return res.status(400).json({ error: 'Invalid post_code is missing' });
  }
  next();
}
