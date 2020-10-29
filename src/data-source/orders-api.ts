import { RESTDataSource } from "apollo-datasource-rest";
import { toSnakeCase } from "../utilities";
export class OrdersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.STORE_URL;
  }

  async order({ orderId }) {
    const data = (await this.get(`api/orders/${orderId}`)).data;
    return data;
  }

  async orders({ userId }) {
    const data = (await this.get(`api/${userId}/orders`)).data;
    return data;
  }

  async checkout(input) {
    return (await this.post(`api/orders`, toSnakeCase(input))).data;
  }

  async updateOrderStatus(orderId: string, input) {
    return (await this.post(`api/orders/${orderId}/status`, toSnakeCase(input)))
      .data;
  }
}
