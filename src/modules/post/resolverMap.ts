// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';

// const resolverMap = {
//   Date: new GraphQLScalarType({
//     description: 'Date custom scalar type',
//     parseValue(value) {
//       return new Date(value); // value from the client
//     },
//     serialize(value) {
//       return value; // value sent to the client
//     },
//     parseLiteral(ast) {
//       if (ast.kind === Kind.INT) {
//         return new Date(ast.value);
//       }
//       return undefined;
//     },

//     name: 'Date',
//   }),
// };
// export default resolverMap;
