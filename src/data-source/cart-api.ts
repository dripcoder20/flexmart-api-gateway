import { RESTDataSource } from "apollo-datasource-rest";
import { toSnakeCase } from "../utilities";
export class CartApi extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.STORE_URL;

  }

  async cart({ userId }) {
    const data = (await this.get(`api/${userId}/cart`)).data;
    return data;
  }

  async addToCart(userId, input) {
    return (await this.post(`api/${userId}/cart`, toSnakeCase(input))).data;
  }

  async deleteCartItem(userId, input) {
    return (await this.delete(`api/${userId}/cart`, toSnakeCase(input))).data;
  }

  async updateCartItem(userId, input) {

    return (await this.put(`api/${userId}/cart`, toSnakeCase(input))).data;
  }
}
