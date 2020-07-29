import { gql } from 'apollo-server';

export default gql`
  type Manufacturer {
    id: ID!,
    order: Int,
    categories: [Category],
    name: String,
    businessAddress: String,
    mobileNumber: String,
    createdAt: String,
    updatedAt: String,
    contactPerson: String,
    email: String,
    phone: String,
    slug: String,
    logo: Image,
    brands: [Brand]
  }

  type Brand {
    id: ID!,
    name: String,
    createdAt: String,
    updatedAt: String,
    variants: [Product],
    order: Int,
    manufacturer: Manufacturer,
    thumbnail: Image,
    description: String
  }

  type Product {
    id: ID!,
    status: String,
    unitOfMeasurement: String,
    quantityPerPack: Int,
    discount: Float,
    variant: String,
    unitPrice: Float,
    totalSales: Int,
    name: String,
    slug: String,
    netWeight: Float,
    tags: [String],
    description: String,
    stocks: Int,
    sku: String,
    createdAt: String,
    updatedAt: String,
    salePrice: Float,
    brand: Brand,
    order: Int,
    categories: [Category],
    thumbnails: [Image],
    variants: [Product],
    store: Store
  }

  type Store {
    id: ID!
    name: String,
    slug: String,
    createdAt: String,
    updatedAt: String,
    products: [Product]
  }

  type Category {
    id: ID!,
    categories: [String],
    name: String,
    createdAt: String,
    updatedAt: String,
    subCategories: [Category],
    products: [Product],
    manufacturers: [Manufacturer],
    order: Int
  }

  type ImageFormats {
    thumbnail: Image,
    small: Image
  }

  type Image {
    id: ID!
    name: String,
    alternativeText: String,
    caption: String,
    hash: String,
    ext: String,
    mime: String,
    size: Float,
    width: Float,
    height: Float,
    url: Float,
    formats: ImageFormats,
    provider: String,
    related: [String],
    createdAt: String,
    updatedAt: String
  }

  type Query {
    products (start: Int, limit: Int): [Product],
    topProducts (start: Int, limit: Int): [Product],
    brands (start: Int, limit: Int): [Brand],
    topBrands (start: Int, limit: Int): [Brand]
    categories (start: Int, limit: Int): [Category],
    topCategories (start: Int, limit: Int): [Category],
    manufacturers (start: Int, limit: Int): [Manufacturer],
    topManufacturers (start: Int, limit: Int): [Manufacturer]
  }
`;
