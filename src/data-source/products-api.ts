import { RESTDataSource } from "apollo-datasource-rest"
import { BASE_API } from "../environments/environment";


export class ProductsApi extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = BASE_API;
      }
    
      async products() {
        return this.get(`products`);
      }
}