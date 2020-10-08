import { RESTDataSource } from "apollo-datasource-rest";
export class CategoriesApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_URL;
  }

  async categories({ _query }) {
    return this.get("categories", _query);
  }

  async topCategories({ _query }) {
    _query._sort = "order:ASC";
    return this.get(`categories`, _query);
  }
}
