declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      name: string;
      email: string;
      password: string;
      desp_permission: number;
      segu_permission: number;
      clie_permission: number;
      user_permission: number;
      created_at?: Date;
      updated_at?: Date;
    };
  }
}
