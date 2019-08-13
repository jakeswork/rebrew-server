import { queryType, stringArg, intArg } from "nexus";

import { getUserId } from "../utils";

const Query = queryType({
  definition(t) {
    t.field("viewer", {
      type: "User",
      description: "The currently authenticated user",
      resolve: (a, b, ctx) => {
        const userId = getUserId(ctx);

        return ctx.photon.users.findOne({
          where: {
            id: userId
          }
        });
      }
    });

    t.field("user", {
      type: "User",
      args: {
        userName: stringArg(),
        id: stringArg()
      },
      resolve: (_, { userName, id }, ctx) => {
        return ctx.photon.users.findOne({
          where: {
            id,
            userName
          }
        });
      }
    });

    t.field("beer", {
      type: "Beer",
      args: {
        id: intArg({
          required: true
        })
      },
      resolve: (_, { id }, ctx) => {
        if (!id) throw new Error("Provide an id to search for.");

        return ctx.beer.findBeerById(id);
      }
    });

    t.list.field("beers", {
      type: "Beer",
      args: {
        name: stringArg({
          nullable: true
        })
      },
      resolve: (_, { name }, ctx) => {
        if (name) return ctx.beer.findBeersByName(name);

        return ctx.beer.findBeers();
      }
    });
  }
});

export default Query;
