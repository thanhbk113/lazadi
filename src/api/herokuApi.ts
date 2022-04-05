import {
  Axios,
  ProductList,
  Products,
  ProductsAction,
  buyProduct,
} from "../share/type";

export const herokuApi = {
  getProduct: () => {
    return Axios.get<Products[]>("products");
  },
  getProductFitler: (nameCategory: string) => {
    return Axios.get<Products[]>(`products?category=${nameCategory}`);
  },
  addProduct: (
    category: string,
    description: string,
    imgUrl: string,
    price: number
  ) => {
    return Axios.post<ProductsAction>("products", {
      category,
      description,
      imgUrl,
      price,
    });
  },
  deleteProduct: (id: number) => {
    return Axios.delete(`products/${id}`);
  },
  editProduct: (
    id: number,
    category: string,
    description: string,
    imgUrl: string,
    price: number
  ) => {
    return Axios.patch<ProductsAction>(`products/${id}`, {
      category,
      description,
      imgUrl,
      price,
    });
  },
  buyProducts: (
    customername: string,
    phoneNumber: string,
    addressCustomer: string,
    productBuy: ProductList[],
    totalProducts: number,
    totalMoney: number
  ) => {
    return Axios.post<buyProduct>("userBuy", {
      customername,
      phoneNumber,
      addressCustomer,
      productBuy,
      totalProducts,
      totalMoney,
    });
  },
};
