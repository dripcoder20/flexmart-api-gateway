import { RESTDataSource } from "apollo-datasource-rest"


export class ManufacturersApi extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_URL;
  }
  
  async manufacturers({_query}) {
    return this.get("manufacturers", _query);
  }

  async topManufacturers({_query}) {
    if (!_query) {
      _query = {}
    }
    _query._sort = "order:ASC";
    return this.get("manufacturers", _query);
  }
}