import { makeExecutableSchema } from 'graphql-tools';
import { resolve } from 'path';
import { configuration } from './configuration';
import { mergeResolver, mergeSchema, Server } from './libs';
import * as modules from './modules';

const schema = {
  resolvers: mergeResolver(modules),
  typeDefs: mergeSchema(resolve(__dirname, '../../src/**/*.graphql')),
};
console.log(schema);

const server = new Server(configuration);
server.setupApolloServer({schema: makeExecutableSchema(schema)});
