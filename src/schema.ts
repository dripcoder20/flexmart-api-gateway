import { gql } from "apollo-server";

export default gql`
  type Manufacturer {
    id: ID!
    order: Int
    categories: [Category]
    name: String
    businessAddress: String
    mobileNumber: String
    createdAt: String
    updatedAt: String
    contactPerson: String
    email: String
    phone: String
    slug: String
    logo: Image
    brands: [Brand]
  }

  type ImageFormats {
    thumbnail: Image
    small: Image
  }

  type Image {
    id: ID!
    name: String
    alternativeText: String
    caption: String
    hash: String
    ext: String
    mime: String
    size: Float
    width: Float
    height: Float
    url: Float
    formats: ImageFormats
    provider: String
    related: [String]
    createdAt: String
  }

  type Brand {
    id: ID!
    name: String
    createdAt: String
    updatedAt: String
    products: [Product]
    order: Int
    manufacturer: Manufacturer
  }

  type Product {
    id: ID!
    status: String
    unitOfMeasurement: String
    quantityPerPack: String
    discount: String
    variant: String
    unitPrice: String
    totalSales: String
    name: String
    slug: String
    netWeight: String
    tags: String
    description: String
    stocks: Int
    sku: String
    createdAt: String
    updatedAt: String
    salePrice: Float
    brand: Brand
  }

  type Category {
    id: ID!
    categories: [String]
    name: String
    createdAt: String
    updatedAt: String
    subCategories: [Category]
    products: [Product]
    order: Int
  }

  type Cart {
    id: ID!
    userId: String
    productId: String
    sku: String
    name: String
    unitPrice: Float
    quantity: Int
    discount: Float
    createdAt: String
    updatedAt: String
  }

  type Query {
    products(start: Int, limit: Int): [Product]
    topProducts(start: Int, limit: Int): [Product]
    brands(start: Int, limit: Int): [Brand]
    topBrands(start: Int, limit: Int): [Brand]
    categories(start: Int, limit: Int): [Category]
    topCategories(start: Int, limit: Int): [Category]
    topManufacturers(start: Int, limit: Int): [Manufacturer]
    cart(userId: ID!): [Cart]
    manufacturers(start: Int, limit: Int): [Manufacturer]
  }

  input AddToCartInput {
    sku: String
    productId: ID!
    name: String
    unitPrice: Float
    quantity: Int
    discount: Float
  }

  type Mutation {
    addToCart(input: AddToCartInput!): [Cart]
    deleteCartItem(productId: [ID]!): [Cart]
    updateCartItem(productId: ID!, quantity: Int!): [Cart]
  }
`;
