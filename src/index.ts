import express from "express";
import expressGraphql from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const root = {
  message: () => "Hello World"
};

const app = express();

app.use(
  "/graphql",
  expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Running on ${process.env.PORT}`)
);
