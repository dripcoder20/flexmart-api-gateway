import { AuthenticationError, ForbiddenError } from "apollo-server";
import GraphQLJSON from "graphql-type-json";

const fetchData = (api: string, method: string, auth = false) => {
  return async (_source: any, _args: object, { dataSources, user }) => {
    if (auth) {
      checkUser(user);
      _args['userId'] = user.uid
    }
    return dataSources[api][method](_args);
  };
};

export default {
  JSON: GraphQLJSON,
  Query: {
    products: fetchData("productsApi", "products"),
    product: fetchData("productsApi", "product"),
    cart: fetchData("cartApi", "cart", true),
    topProducts: fetchData("productsApi", "topProducts"),
    brands: fetchData("brandsApi", "brands"),
    topBrands: fetchData("brandsApi", "topBrands"),
    categories: fetchData("categoriesApi", "categories"),
    topCategories: fetchData("categoriesApi", "topCategories"),
    manufacturers: fetchData("manufacturersApi", "manufacturers"),
    topManufacturers: fetchData("manufacturersApi", "topManufacturers"),
    transactions: fetchData("transactionsApi", "transactions"),
    transaction: fetchData("transactionsApi", "transaction"),
    orders: fetchData("ordersApi", "orders", true),
    order: fetchData("ordersApi", "order", true),
  },
  Mutation: {
    addToCart: async (_, { input }, { dataSources, user }) => {
      checkUser(user);
      const cart = dataSources.cartApi.addToCart(user.uid, input);
      return cart;
    },
    deleteCartItem: async (_, { productId }, { dataSources, user }) => {
      checkUser(user);
      const cart = dataSources.cartApi.deleteCartItem(user.uid, {
        productId,
      });
      return cart;
    },
    updateCartItem: async (_, { productId, quantity }, { dataSources, user }) => {
      checkUser(user);
      const cart = dataSources.cartApi.updateCartItem(user.uid, {
        product_id: productId,
        quantity,
      });
      return cart;
    },
    cancelTransaction: async (_, { trackingNumber }, { dataSources }) => {
      const userId = 1;
      const transaction = dataSources.transactionsApi.cancelTransaction(
        userId,
        trackingNumber
      );
      return transaction;
    },

    checkout: async (_, { input }, { dataSources, user }) => {
      checkUser(user)
      input = {...input, user, userId: user.uid }
      const order = dataSources.ordersApi.checkout(input);
      return order;
    },

    updateOrderStatus: async (_, { input }, { dataSources, user }) => {
      checkUser(user)
      const order = dataSources.ordersApi.updateOrderStatus(input);
      return order;
    },
  },
};

function checkUser(user) {
  if (!user) {
    throw new AuthenticationError("Unauthenticated")
  }
}