import { Response } from 'express';
import { v4 } from 'uuid';

import { LogError } from '~/entities/sequelize/LogError';

type ErrorResponseType = {
  code: number;
  message: string;
  details?: any;
}

export async function errorWork(res: Response, error: any) {
  try {
    await LogError.create({
      id: v4(),
      message: error.message || 'no-content',
      error: JSON.stringify(error) || 'no-content',
    });
  } catch(err) {
    console.log('Erro ao adicioanr log de erro no banco de dados');
    console.log(err);
  }

  try {
    const errorJson: ErrorResponseType = JSON.parse(error.message);

    return res.status(errorJson.code || 400).json({
      code: errorJson.code || 400,
      message: errorJson.message,
      details: errorJson.details || null,
    });
  } catch(err) {
    return res.status(500).json({
      code: 500,
      message: 'Erro inesperado.',
      details: error.message || null,
    });
  }
}
