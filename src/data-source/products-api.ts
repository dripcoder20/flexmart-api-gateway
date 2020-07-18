import { RESTDataSource } from "apollo-datasource-rest"

export class ProductsApi extends RESTDataSource {

  constructor() {
      super();
      this.baseURL = process.env.PRODUCTS_URL;
    }
  
  async products({start = 0, limit = 10}) {
    const option = `_start=${start}&_limit=${limit}`
    return this.get(`products?${option}`);
  }

  async topProducts({start = 0, limit = 10}) {
    const option = `_sort=totalSales:DESC&_start=${start}&_limit=${limit}`;
    return this.get(`products?${option}`);
  }
}