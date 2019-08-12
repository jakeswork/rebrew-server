import { readdirSync } from "fs";
import { join } from "path";
import { nexusPrismaPlugin } from "@generated/nexus-prisma";
import Photon from "@generated/photon";
import { makeSchema } from "@prisma/nexus";
import { GraphQLServer } from "graphql-yoga";
import { ContextParameters } from "graphql-yoga/dist/types";

import { Context } from "./types";
import { NexusObjectTypeDef } from "nexus/dist/core";

const resolversDir: string = join(__dirname, "resolvers");

const types: NexusObjectTypeDef<string>[] = readdirSync(resolversDir).map(
  (fileName: string): NexusObjectTypeDef<string> =>
    require(join(resolversDir, fileName)).default
);

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon
});

const schema = makeSchema({
  types: [...types, nexusPrisma],
  outputs: {
    typegen: join(__dirname, "../generated/nexus-typegen.ts"),
    schema: join(__dirname, "/schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@generated/photon",
        alias: "photon"
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});

const server = new GraphQLServer({
  schema,
  context: (req: ContextParameters): Context => ({
    ...req,
    photon: new Photon()
  })
});

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`));
