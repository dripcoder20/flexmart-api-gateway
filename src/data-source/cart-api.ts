import { RESTDataSource } from "apollo-datasource-rest";
import { snakeCase } from "lodash/snakeCase";
import { toSnakeCase } from "../utilities";
export class CartApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.STORE_URL;
  }

  async cart({ userId }) {
    const data = (await this.get(`api/cart/${userId}`)).data;
    return data;
  }

  async addToCart(userId, input) {
    return (await this.post(`api/cart/${userId}`, toSnakeCase(input))).data;
  }

  async deleteCartItem(userId, input) {
    return (await this.delete(`api/cart/${userId}`, toSnakeCase(input))).data;
  }

  async updateCartItem(userId, input) {
    return (await this.put(`api/cart/${userId}`, toSnakeCase(input))).data;
  }
}
