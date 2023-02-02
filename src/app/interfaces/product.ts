export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    type: string;
    obs: string;
    postOn: [index:string];
    hide: number;
    dueDate: string;
  }