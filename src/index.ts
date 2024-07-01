import "reflect-metadata";
import express from "express";
import db from "./db";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/CountryResolver"

buildSchema({ resolvers: [CountryResolver] }).then((schema) => {
  const server = new ApolloServer({ schema });
  startStandaloneServer(server, {
    listen: { port: 4001 },
  }).then(({ url }) => {
    console.log(`server ready on ${url}`);
  });
});

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());


app.listen(port, async () => {
  await db.initialize();
});