import express from "express";
require("dotenv").config();
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { User } from "graphql/user";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });
  const gqlServer = new ApolloServer({
    typeDefs: `
           
            type Query {
              ${User.queries}
            }

            type Mutation {
              ${User.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  app.use("/", expressMiddleware(gqlServer));
  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
