declare namespace Express {
  interface Request {
    user?: { id: number; email: string; }
  }

  interface Response {
    success: (status: number, data: any, message?: string) => void;
    failed: (status: number, message: any, errors?: Record<string, ValidationError>) => void;
  }
}
