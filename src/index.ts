import express from "express";
require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Create GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `  
    type Query {
      hello:String
      say(name:String):String
    }
    `, // Schema
    resolvers: {
      Query: {
        hello: () => `Hey there I am a graphql server`,
        say: (_, { name }: { name: String }) => `Hey ${name}, How are you ?`,
      },
    },
  });

  // Start Server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server🚀 listening on ${PORT}`);
  });
}

init();
