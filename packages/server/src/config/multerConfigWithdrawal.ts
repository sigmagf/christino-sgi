import AWS from 'aws-sdk';
import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'withdrawal'));
    },
    filename: (req, file, cb) => {
      cb(null, `${req.params.id}.pdf`);
    },
  }),
  s3: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${process.env.AWS_S3_FOLDER_WITHDRAWALS}/${(req as Request).params.id}.pdf`);
    },
  }),
};

export const multerConfigWithdrawal: multer.Options = {
  storage: storageTypes[process.env.MULTER_STORAGE],
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf'];

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(JSON.stringify({ code: 400, message: 'Tipo do arquivo inválido', details: null })));
    }
  },
};
