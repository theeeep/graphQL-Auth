import { ApolloServer } from "@apollo/server";

// Create GraphQL Server
async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {

        }
        type Mutation {
            
        }
      `,
    resolvers: {
      Query: {},
      Mutataion: {},
    },
  });
  await gqlServer.start(); // Start Server

  return gqlServer;
}
export default createApolloGraphqlServer;
