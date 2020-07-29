import { RESTDataSource } from "apollo-datasource-rest"


export class ManufacturersApi extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_URL;
  }
  
  async manufacturers({start = 0, limit = 10}) {
    const option = `_start=${start}&_limit=${limit}`
    return this.get(`manufacturers?${option}`);
  }

  async topManufacturers({start = 0, limit = 10}) {
    const option = `_sort=order:DESC&_start=${start}&_limit=${limit}`;
    return this.get(`manufacturers?${option}`);
  }
}