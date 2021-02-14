declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      name: string;
      email: string;
      password: string;
      despPermission: number;
      seguPermission: number;
      cliePermission: number;
      userPermission: number;
      createdAt?: Date;
      updatedAt?: Date;
    };
  }
}
