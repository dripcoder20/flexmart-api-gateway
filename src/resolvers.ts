import GraphQLJSON from "graphql-type-json";

const fetchData = (api: string, method: string) => {
  return async (_source: any, _args: object, { dataSources }) => {
    return dataSources[api][method](_args);
  };
};

export default {
  JSON: GraphQLJSON,
  Query: {
    products: fetchData("productsApi", "products"),
    product: fetchData("productsApi", "product"),
    cart: fetchData("cartApi", "cart"),
    topProducts: fetchData("productsApi", "topProducts"),
    brands: fetchData("brandsApi", "brands"),
    topBrands: fetchData("brandsApi", "topBrands"),
    categories: fetchData("categoriesApi", "categories"),
    topCategories: fetchData("categoriesApi", "topCategories"),
    manufacturers: fetchData("manufacturersApi", "manufacturers"),
    topManufacturers: fetchData("manufacturersApi", "topManufacturers"),
    transactions: fetchData("transactionsApi", "transactions"),
    transaction: fetchData("transactionsApi", "transaction"),
    orders: fetchData("ordersApi", "orders"),
    order: fetchData("ordersApi", "order"),
  },
  Mutation: {
    addToCart: async (_, { input }, { dataSources }) => {
      const userId = 1;
      const cart = dataSources.cartApi.addToCart(userId, input);
      return cart;
    },
    deleteCartItem: async (_, { productId }, { dataSources }) => {
      const userId = 1;
      const cart = dataSources.cartApi.deleteCartItem(userId, {
        productId,
      });
      return cart;
    },
    updateCartItem: async (_, { productId, quantity }, { dataSources }) => {
      const userId = 1;
      const cart = dataSources.cartApi.updateCartItem(userId, {
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

    checkout: async (_, { input }, { dataSources }) => {
      const order = dataSources.ordersApi.checkout(input);
      return order;
    },

    updateOrderStatus: async (_, { input }, { dataSources }) => {
      const order = dataSources.ordersApi.updateOrderStatus(input);
      return order;
    },
  },
};
