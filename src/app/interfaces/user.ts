export interface User {
    id?: string;
    name?: string;
    password: string;
    email: string;
    role?: string;
    tokens?: string;
    results?: any;
    page?: number;
  }