import jwt from 'jsonwebtoken';

interface IGenerateTokenParams {
  email: string;
  id: string;
}

export function generateToken({ email, id }: IGenerateTokenParams) {
  return jwt.sign({ email }, process.env.SECRET_KEY, {
    subject: id,
    expiresIn: 86400,
  });
}
