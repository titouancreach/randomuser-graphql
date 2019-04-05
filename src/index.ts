import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server";
import { importSchema } from "graphql-import";
import fetch from "node-fetch";

import fake from "./fake.json";
import { response } from "express";

const typeDefs = gql(importSchema("src/graphql/schema.graphql"));

const randomUserAPI = "https://randomuser.me/api/";

const resolvers = {
  Query: {
    randomUser: async () => {
      const response = await fetch(randomUserAPI);
      const json = await response.json();
      const u = json.results[0];
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
