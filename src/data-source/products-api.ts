import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";

export class ProductsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_URL;
  }

  async products({ _query }) {
    return this.get("products", _query);
  }

  async topProducts({ _query }) {
    _query._sort = "totalSales:DESC";
    return this.get(`products`, _query);
  }

  async product({ id }) {
    return this.get(`products/${id}`);
  }
}
