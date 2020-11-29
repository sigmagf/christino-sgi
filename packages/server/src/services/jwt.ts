import jwt from 'jsonwebtoken';

import { IToken } from '~/interface';

export default {
  sign(obj: { id: string }): string {
    return jwt.sign(obj, process.env.JWT_SECRET);
  },

  verify(token: string): any {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err: any, decode: IToken) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(decode);
      });
    });
  },
};
