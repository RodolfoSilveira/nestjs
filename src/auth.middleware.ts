import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {secret} from './config/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ error: 'No token provided' })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).send({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'Token malformatted' })
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'Token invalid' })
      }

      req.userId = decoded.id
      return next()
    })
  }
}
