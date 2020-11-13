import { ApolloServer, ApolloError, ForbiddenError } from "apollo-server";

import resolvers from "./resolvers";
import typeDefs from "./schema";
import { ProductsApi } from "./data-source/products-api";
import { BrandsApi } from "./data-source/brands-api";
import { CategoriesApi } from "./data-source/categories-api";
import dotenv from "dotenv";
import { ManufacturersApi } from "./data-source/manufactures-api";
import { CartApi } from "./data-source/cart-api";
import snakeCase from "lodash/snakeCase";
import { TransactionsApi } from "./data-source/transactions-api";
import { OrdersApi } from "./data-source/orders-api";
import { getUser } from './firebase-admin'
dotenv.config();

const snakeCaseWhitelist = ["Product", "Category", "Brand", "Manufacturer"];

// https://stackoverflow.com/a/53893443
const snakeCaseFieldResolver = (source, _args, _contextValue, info) => {
  if (snakeCaseWhitelist.includes(info.parentType.toString())) {
    return source[info.fieldName];
  }
  return source[snakeCase(info.fieldName)];
};
const server = new ApolloServer({
  context: async ({req}) =>{
    const token = req.headers.authorization || '';
    if (token) {
      return {user: await getUser(token)}
    }
  },
  fieldResolver: snakeCaseFieldResolver,
  resolvers,
  typeDefs,
  cors: {
    origin: "*",
    credentials: true,
  },
  formatError: (err) => {
    return new ApolloError(err.message, err.extensions.code, { code: err.extensions.code });
  },
  dataSources: () => {
    return {
      productsApi: new ProductsApi(),
      brandsApi: new BrandsApi(),
      categoriesApi: new CategoriesApi(),
      manufacturersApi: new ManufacturersApi(),
      cartApi: new CartApi(),
      transactionsApi: new TransactionsApi(),
      ordersApi: new OrdersApi(),
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
