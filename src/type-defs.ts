import { gql } from 'apollo-server';

export default gql`
  type Product {
    name: String
  }

  type Query {
    products: [Product]
  }
`;
