import { Response } from 'express';

type ErrorResponseType = {
  code: number;
  message: string;
  details?: any;
}

export function errorWork(res: Response, message: string) {
  try {
    const errorJson: ErrorResponseType = JSON.parse(message);

    return res.status(errorJson.code || 400).json({
      code: errorJson.code || 400,
      message: errorJson.message,
      details: errorJson.details || null,
    });
  } catch(err) {
    return res.status(500).json({
      code: 500,
      message: 'Erro inesperado.',
      details: message || null,
    });
  }
}
