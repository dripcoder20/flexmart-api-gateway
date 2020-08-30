import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers";
import typeDefs from "./schema";
import { ProductsApi } from "./data-source/products-api";
import { BrandsApi } from "./data-source/brands-api";
import { CategoriesApi } from "./data-source/categories-api";
import dotenv from "dotenv";
import { ManufacturersApi } from "./data-source/manufactures-api";
import { CartApi } from "./data-source/cart-api";
import snakeCase from "lodash/snakeCase";
dotenv.config();

// https://stackoverflow.com/a/53893443
const snakeCaseFieldResolver = (source, _args, _contextValue, info) => {
  return source[snakeCase(info.fieldName)];
};
const server = new ApolloServer({
  fieldResolver: snakeCaseFieldResolver,
  resolvers,
  typeDefs,
  cors: {
    origin: "*",
    credentials: true,
  },
  dataSources: () => {
    return {
      productsApi: new ProductsApi(),
      brandsApi: new BrandsApi(),
      categoriesApi: new CategoriesApi(),
      manufacturersApi: new ManufacturersApi(),
      cartApi: new CartApi(),
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
