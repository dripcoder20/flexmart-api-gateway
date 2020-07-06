import { gql } from 'apollo-server';

export default gql`
  type Brand {
    name: String,
    createdAt: String,
    updatedAt: String,
    manufacturer: String,
    id: String
  }
  type Product {
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
    id: String,
    salePrice: Float,
    brand: Brand
  }

  type Query {
    products: [Product]
  }
`;
