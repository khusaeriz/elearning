import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      const token = verify(req.headers.authorization, JWT_SECRET);
      res.locals.user = token;
      
      next();
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: true, message: 'unauthorized' });
    }
  }
}
