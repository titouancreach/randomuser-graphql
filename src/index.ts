import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server";
import { importSchema } from "graphql-import";
import fetch from "node-fetch";

const typeDefs = gql(importSchema("src/graphql/schema.graphql"));

const randomUserAPI = "https://randomuser.me/api/";

interface Response {
  results: any[]; // generate from graphql schema ?
}

const resolvers = {
  Query: {
    randomUser: async () => {
      const response = await fetch(randomUserAPI);
      const json = (await response.json()) as Response;
      return json.results[0];
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
