import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IDecodedUser {
  sub: string,
}

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'No token provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token malformatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error: Error, decoded: IDecodedUser) => {
    if (error) {
      response.status(401).json({ error: 'Invalid token' });
    }
    const { sub } = decoded;
    request.user_id = sub;
  });

  next();
}
