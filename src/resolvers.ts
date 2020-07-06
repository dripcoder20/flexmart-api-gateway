export default {
    Query: {
        products: async (_source: any, _args:any, { dataSources }: any) => {
            return dataSources.productsApi.products();
        },
    }
};
