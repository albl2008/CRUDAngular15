
export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    type: string;
    obs: string;
    postOn: [index:string];
    hide: boolean;
    dueDate: string;
  }