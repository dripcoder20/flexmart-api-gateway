import { gql } from 'apollo-server';

export default gql`
  type Manufacturer {
    id: ID!,
    order: Int,
    name: String,
    businessAddress: String,
    mobileNumber: String,
    createdAt: String,
    updatedAt: String
  }

  type Brand {
    id: ID!,
    name: String,
    createdAt: String,
    updatedAt: String,
    products: [Product],
    order: Int,
    manufacturer: Manufacturer
  }

  type Product {
    id: ID!,
    status: String,
    unitOfMeasurement: String,
    quantityPerPack: String,
    discount: String,
    variant: String,
    unitPrice: String,
    totalSales: String,
    name: String,
    slug: String,
    netWeight: String,
    tags: String,
    description: String,
    stocks: Int,
    sku: String,
    createdAt: String,
    updatedAt: String,
    salePrice: Float,
    brand: Brand
  }

  type Category {
    id: ID!,
    categories: [String],
    name: String,
    createdAt: String,
    updatedAt: String,
    subCategories: [Category],
    products: [Product],
    order: Int
  }

  type Query {
    products (start: Int, limit: Int): [Product],
    topProducts (start: Int, limit: Int): [Product],
    brands (start: Int, limit: Int): [Brand],
    topBrands (start: Int, limit: Int): [Brand]
    categories (start: Int, limit: Int): [Category],
    topCategories (start: Int, limit: Int): [Category]
  }
`;
