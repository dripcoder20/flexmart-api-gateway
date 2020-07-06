import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './type-defs';
import { ProductsApi } from './data-source/products-api';

const server = new ApolloServer({
    resolvers,
    typeDefs,
    dataSources: () => {
        return {
            productsApi: new ProductsApi(),
        };
    },
});

server.listen()
    .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
}
