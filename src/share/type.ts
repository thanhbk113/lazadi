import axios from "axios";

export const clientId =
  "506441914421-ni2db10dvgmg4td5lana58bctb6b7fqc.apps.googleusercontent.com";

export const Axios = axios.create({
  baseURL: "https://json-server-ts-bk.herokuapp.com/",
});

export interface Products {
  category: string;
  description: string;
  id: number;
  imgUrl: string;
  price: number;
  title: string;
}

export interface ProductsAction {
  id: number;
  category: string;
  description: string;
  imgUrl: string;
  price: number;
}

export interface ProductList {
  id: number;
  category: string;
  imgUrl: string;
  price: number;
  amount: number;
}

export interface buyProduct {
  customerName: string;
  phoneNumber: string;
  addressCustomer: string;
  productBuy: ProductList[];
  totalProducts: number;
  totalMoney: number;
}
