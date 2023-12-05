// Generated by https://quicktype.io

export interface IFullProduct {
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
    category:    Category;
    brand:       Brand;
    provider:    Provider;
}

export interface Brand {
    id:        string;
    name:      string;
    slug:      string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id:          string;
    name:        string;
    slug:        string;
    description: string;
    image:       string;
    createdAt:   string;
    updatedAt:   string;
}

export interface Provider {
    id:        string;
    name:      string;
    direction: string;
    email:     string;
    phone:     string;
    status:    boolean;
    createdAt: string;
    updatedAt: string;
}