import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const multerConfig: multer.Options = {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {
          cb(err, file.originalname);
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fieldSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['text/csv'];

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};

export { multerConfig };
