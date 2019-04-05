import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server";
import { importSchema } from "graphql-import";

import fake from "./fake.json";

const typeDefs = gql(importSchema("src/graphql/schema.graphql"));

const resolvers = {
  Query: {
    user: () => {
      const u = fake.results[0];
      return u;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Running on ${url}`);
});
