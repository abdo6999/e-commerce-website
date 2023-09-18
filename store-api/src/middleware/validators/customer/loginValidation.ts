import { Request, Response, NextFunction } from 'express';
import { AuthCredentialsDto } from '../../../interfaces/customer/auth/auth-credentials.dto';

export function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authCredentials: AuthCredentialsDto = req.body.authCredentialsDot

  // Validate fields
  if (!authCredentials.username) {
    return res.status(400).json({ error: 'Invalid username is missing' });
  }

  if (!authCredentials.password) {
    return res.status(400).json({ error: 'Invalid password is missing' });
  }

  next();
}
