
const fetchData = ( api: string, method: string) => {
  return async (_source: any, _args: object, { dataSources }) => {
    return dataSources[api][method](_args);
  }
}

export default {
  Query: {
    products: fetchData("productsApi", "products"),
    cart: fetchData("cartApi", "cart"),
    topProducts: fetchData("productsApi", "topProducts"),
    brands: fetchData("brandsApi", "brands"),
    topBrands: fetchData("brandsApi", "topBrands"),
    categories: fetchData("categoriesApi", "categories"),
    topCategories: fetchData("categoriesApi", "topCategories"),
    manufacturers: fetchData("manufacturersApi", "manufacturers"),
    topManufacturers: fetchData("manufacturersApi", "topManufacturers")
  }
};
