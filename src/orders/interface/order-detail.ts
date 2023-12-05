export interface IOrderDetail {
    id:        string;
    quantity:  number;
    createdAt: string;
    updatedAt: string;
    product:   IOrderProduct;
}

export interface IOrderProduct {
    id:          string;
    name:        string;
    slug:        string;
    image:       string;
    description: string;
    stock:       string;
    price:       number;
    status:      boolean;
    createdAt:   string;
    updatedAt:   string;
}
