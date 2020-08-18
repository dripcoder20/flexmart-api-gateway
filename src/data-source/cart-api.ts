import { RESTDataSource } from "apollo-datasource-rest";

export class CartApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.STORE_URL;
  }

  async cart({ userId }) {
    return (await this.get(`api/cart/${userId}`)).data;
  }
}
