import { gql } from "apollo-server";

export default gql`
  scalar JSON
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
    url: String
    formats: ImageFormats
    provider: String
    related: [String]
    createdAt: String
  }

  type Brand {
    id: ID!
    name: String
    slug: String
    createdAt: String
    updatedAt: String
    thumbnail: Image
    products: [Product]
    order: Int
    manufacturer: Manufacturer
  }

  type Product {
    id: ID!
    status: Int
    unitOfMeasurement: String
    quantityPerPack: Int
    discount: Float
    variant: String
    unitPrice: Float
    totalSales: Int
    name: String
    slug: String
    netWeight: Float
    tags: String
    description: String
    stocks: Int
    sku: String
    createdAt: String
    updatedAt: String
    salePrice: Float
    brand: Brand
    categories: [Category]
    thumbnails: [Image]
    order: Int
  }

  type Category {
    id: ID!
    name: String
    slug: String
    createdAt: String
    updatedAt: String
    subCategories: [Category]
    products: [Product]
    order: Int
    thumbnails: [Image]
  }

  type Cart {
    id: ID!
    thumbnail: String
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

  type Transaction {
    id: ID!
    userId: String
    transactionType: Int
    amount: Float
    trackingNumber: String
    status: Int
    paymentType: Int
  }

  type Address {
    id: ID!
    address: String
    barangay: String
    city: String
    province: String
  }

  type ShippingInformation {
    addressInformation: Address
    remarks: String
    mobileNumber: String
    contactPerson: String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    mobileNumber: String
    address: [Address]
  }

  type Order {
    id: ID!
    trackingNumber: ID!
    amount: Float
    userId: ID!
    user: User
    paymentType: Int
    shippingType: Int
    shippingCharge: Float
    shippingInformation: ShippingInformation
    discount: Float
    cart: [Cart]
    status: Int
    paymentReceived: Boolean
    statuses: [OrderStatus]
    createdAt: String
    updatedAt: String
  }

  type CancelTransactionPayload {
    trackingNumber: String
    status: Int
  }

  type OrderStatus {
    id: ID!
    orderId: ID!
    status: Int
    remarks: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    products(_query: JSON): [Product]
    product(id: ID!): Product
    topProducts(_query: JSON): [Product]
    brands(start: Int, limit: Int): [Brand]
    topBrands(start: Int, limit: Int): [Brand]
    categories(_query: JSON): [Category]
    topCategories(_query: JSON): [Category]
    topManufacturers(_query: JSON): [Manufacturer]
    cart(userId: ID!): [Cart]
    manufacturers(_query:JSON): [Manufacturer]
    transactions(start: Int, limit: Int): [Transaction]
    transaction(trackingNumber: String!): Transaction
    orders(userId: ID!, start: Int, limit: Int): [Order]
    order(orderId: ID!, start: Int, limit: Int): Order
  }

  input AddToCartInput {
    sku: String
    productId: ID!
    name: String
    unitPrice: Float
    quantity: Int
    thumbnail: String
    discount: Float
  }

  input AddressInput {
    address: String
    barangay: String
    city: String
    province: String
  }

  input ShippingInformationInput {
    addressInformation: AddressInput
    remarks: String
    mobileNumber: String
    contactPerson: String
  }

  input CartInput {
    id: ID!
    thumbnail: String
    productId: String
    sku: String
    name: String
    unitPrice: Float
    quantity: Int
    discount: Float
  }

  input CheckoutOrderInput {
    amount: Float
    paymentType: Int
    shippingType: Int
    shippingCharge: Float
    shippingInformation: ShippingInformationInput
    discount: Float
    cart: [CartInput]
  }

  input UpdateOrderStatusInput {
    id: ID!
    orderId: ID!
    status: Int
    remarks: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    addToCart(input: AddToCartInput!): [Cart]
    deleteCartItem(productId: [ID]!): [Cart]
    updateCartItem(productId: ID!, quantity: Int!): [Cart]
    cancelTransaction(trackingNumber: ID!): CancelTransactionPayload
    checkout(input: CheckoutOrderInput!): Order
    updateOrderStatus(input: UpdateOrderStatusInput!): Order
  }
`;
