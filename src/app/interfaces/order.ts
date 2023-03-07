export interface Order {
    id?: string;
    client: string;
    description: string;
    total: number;
    type: string;
    obs: string;
    products?: any[];
    quantity?: any[];
    date: string;
  }