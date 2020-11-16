import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import { toSnakeCase } from "../utilities";
import { ProductsApi } from "./products-api";
export class CartApi extends RESTDataSource {

  constructor(private productsApi: ProductsApi) {
    super();
    this.baseURL = process.env.STORE_URL;
  }

  async cart({ userId }) {
    const data = (await this.get(`api/${userId}/cart`)).data;
    return data;
  }

  async addToCart(userId, input) {
    // fetch product stocks
    await this.checkStocks(input.productId, input.quantity)
    return (await this.post(`api/${userId}/cart`, toSnakeCase(input))).data;
  }

  async deleteCartItem(userId, input) {
    return (await this.delete(`api/${userId}/cart`, toSnakeCase(input))).data;
  }

  async updateCartItem(userId, input) {
    await this.checkStocks(input.product_id, input.quantity)
    // fetch product stocks
    return (await this.put(`api/${userId}/cart`, toSnakeCase(input))).data;
  }

  async checkStocks(id: string, quantity: number) {
    const product = await this.productsApi.product({id});
    if (product.stocks < quantity) {
      throw new ApolloError("No more stocks left", "INSUFFICIENT_STOCKS")
    }
  }
}
