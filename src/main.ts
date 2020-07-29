import { ApolloServer } from "apollo-server";

import resolvers from './resolvers';
import typeDefs from './schema';
import { ProductsApi } from './data-source/products-api';
import { BrandsApi } from './data-source/brands-api';
import { CategoriesApi } from './data-source/categories-api';
import dotenv from 'dotenv'
import { ManufacturersApi } from "./data-source/manufactures-api";

dotenv.config();
const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => {
    return {
      productsApi: new ProductsApi(),
      brandsApi: new BrandsApi(),
      categoriesApi: new CategoriesApi(),
      manufacturersApi: new ManufacturersApi()
    };
  },
});

server
  .listen({ port: 3212 })
  .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
