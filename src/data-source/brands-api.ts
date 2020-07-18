import { RESTDataSource } from "apollo-datasource-rest"


export class BrandsApi extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_URL;
  }
  
  async brands({start = 0, limit = 10}) {
    const option = `_start=${start}&_limit=${limit}`
    return this.get(`brands?${option}`);
  }

  async topBrands({start = 0, limit = 10}) {
    const option = `_sort=totalSales:DESC&_start=${start}&_limit=${limit}`;
    return this.get(`brands?${option}`);
  }
}