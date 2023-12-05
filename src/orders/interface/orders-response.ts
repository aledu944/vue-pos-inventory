// Generated by https://quicktype.io

import type { IOrderDetail } from "./order-detail";

export interface IOrdersResponse {
    id:           string;
    total:        number;
    type:         string;
    createdAt:    string;
    updatedAt:    string;
    user:         OrderUser;
    client:       OrderUser;
    orderDetails: IOrderDetail[];
}

export interface OrderUser {
    id:        string;
    name:      string;
    lastname:  string;
    email:     string;
    avatar:    null | string;
    gender:    string;
    password:  string;
    createdAt: string;
    updatedAt: string;
}

