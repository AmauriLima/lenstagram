import jwt from 'jsonwebtoken';

interface IGenerateTokenParams {
  email: string;
  id: string;
}

export function generateToken({ email, id }: IGenerateTokenParams) {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    subject: id,
    expiresIn: process.env.JWT_EXPIRATION,
  });
}
