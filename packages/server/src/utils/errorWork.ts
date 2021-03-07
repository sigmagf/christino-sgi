import { Request, Response } from 'express';
import { v4 } from 'uuid';

import { LogError } from '~/entities/sequelize/LogError';

type ErrorResponseType = {
  code: number;
  message: string;
  details?: any;
}

export async function errorWork(req: Request, res: Response, error: any) {
  try {
    const errorJson: ErrorResponseType = JSON.parse(error.message);

    return res.status(errorJson.code || 400).json({
      code: errorJson.code || 400,
      message: errorJson.message,
      details: errorJson.details || null,
    });
  } catch(err) {
    await LogError.create({
      id: v4(),
      userId: req.user?.id || null,
      message: error.message || 'no-content',
      error: JSON.stringify(error) || 'no-content',
    });

    console.log(error);

    return res.status(500).json({
      code: 500,
      message: 'Erro inesperado.',
      details: error.message || null,
    });
  }
}
