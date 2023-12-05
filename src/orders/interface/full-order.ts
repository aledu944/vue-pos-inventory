// Generated by https://quicktype.io

import type { IOrderDetail } from "./order-detail";

export interface IFullOrder {
    id:           string;
    total:        number;
    type:         string;
    createdAt:    string;
    updatedAt:    string;
    client:       IFullOrderClient;
    orderDetails: IOrderDetail[];
}

export interface IFullOrderClient {
    id:        string;
    name:      string;
    lastname:  string;
    email:     string;
    avatar:    null;
    gender:    string;
    password:  string;
    createdAt: string;
    updatedAt: string;
}