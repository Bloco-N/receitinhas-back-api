import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {buildSchema } from "type-graphql";
import { resolvers } from "../prisma/generated/type-graphql";
import Container, { Service } from "typedi";
import { myResolvers } from "./resolvers";
import { Context, context } from "./context";

(async () => {
  
  resolvers.forEach((resolver) => Service()(resolver))

  const schema = await buildSchema({
    resolvers: [...resolvers, ...myResolvers],
    container: Container,
    validate: false,
  });

  const server = new ApolloServer<Context>({
    schema,
  })
  
  const { url } = await startStandaloneServer(server,{
    listen: { port: 4000 },
    context: async () => context,
  });

  console.log(`🛫🏢 Server ready at ${url}`);

})()


