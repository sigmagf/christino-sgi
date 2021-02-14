import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { usersFindService } from '~/services/users/find';

function userCanAccessRoute(req: Request, path: string, permLevel: number) {
  if(req.path.includes(path)) {
    if(req.method === 'GET' && permLevel < 1) {
      return false;
    } if((req.method === 'POST' || req.method === 'PUT') && permLevel < 2) {
      return false;
    } if(req.method === 'DELETE' && permLevel < 3) {
      return false;
    }
  }

  return true;
}

// eslint-disable-next-line consistent-return
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ code: 401, message: 'Nenhum token enviado.', details: null });
  }

  const tokenSplit = authHeader.split(' ');

  if(tokenSplit.length !== 2) {
    return res.status(401).json({ code: 401, message: 'Erro no token.', details: null });
  }

  const [bearer, token] = tokenSplit;

  if(!/^Bearer$/i.test(bearer)) {
    return res.status(401).json({ code: 401, message: 'Token malformatado.', details: null });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode: { id: string }) => {
    if(err) {
      return res.status(401).json({ code: 401, message: 'Token inválido.', details: null });
    }

    if(decode.id) {
      const user = await usersFindService.execute({ id: decode.id });

      if(!user) {
        return res.status(404).json({ code: 404, message: 'Usuário não encontrado.', details: null });
      }

      if(!userCanAccessRoute(req, '/vehicles', user.despPermission)
      || !userCanAccessRoute(req, '/clients', user.cliePermission)
      || !userCanAccessRoute(req, '/users', user.userPermission)
      || !userCanAccessRoute(req, '/isurances', user.seguPermission)
      || !userCanAccessRoute(req, '/works', user.workPermission)) {
        return res.status(401).json({ code: 401, message: 'Usuário não tem permissão para acessar essa rota.', details: `[${req.method}]  ${req.path}` });
      }

      req.user = user;
      return next();
    }

    return res.status(404).json({ code: 404, message: 'Usuário não encontrado.', details: null });
  });
}
