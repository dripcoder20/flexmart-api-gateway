import { RESTDataSource } from "apollo-datasource-rest";
import { toSnakeCase } from "../utilities";
export class TransactionsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.STORE_URL;
  }

  async transactions({ userId = 1, start = 0, limit = 10 }) {
    return (await this.get(`api/${userId}/transactions?offset=${start}&limit=${limit}`)).data;
  }

  async transaction({userId = 1, trackingNumber}) {
    return (await this.get(`api/${userId}/transactions/${trackingNumber}`)).data;
  }

  async cancelTransaction(userId, trackingNumber) {
    return (await this.delete(`api/${userId}/transactions/${trackingNumber}`)).data;
  }
}
