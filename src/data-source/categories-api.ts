import { RESTDataSource } from "apollo-datasource-rest"


export class CategoriesApi extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_URL;
  }
  
  async categories({start = 0, limit = 10}) {
    const option = `_start=${start}&_limit=${limit}`
    return this.get(`categories?${option}`);
  }

  async topCategories({start = 0, limit = 10}) {
    const option = `_sort=order:DESC&_start=${start}&_limit=${limit}`;
    return this.get(`categories?${option}`);
  }
}