import { queryType, arg, intArg, stringArg } from "nexus";

import { getUserId } from "../utils";

const Query = queryType({
  definition(t) {
    t.field("viewer", {
      type: "User",
      description: "The currently authenticated user",
      resolve: async (a, b, ctx) => {
        const user_id = getUserId(ctx);
        const user = await ctx.photon.users.findOne({
          where: {
            id: user_id
          }
        });

        await ctx.photon.disconnect();

        return user;
      }
    });

    t.field("user", {
      type: "User",
      args: {
        where: arg({
          type: "UserWhereInput",
          required: true
        })
      },
      resolve: async (_, { where }, ctx) => {
        const user = await ctx.photon.users.findOne({
          where
        });

        await ctx.photon.disconnect();

        return user;
      }
    });

    t.field("beer", {
      type: "Beer",
      args: {
        where: arg({
          type: "BeerWhereInput",
          required: true
        })
      },
      resolve: (_, { where }, ctx) => {
        if (!where && !where.id)
          throw new Error("Provide an id to search for.");

        return ctx.beer.findBeerById(where.id);
      }
    });

    t.list.field("beers", {
      type: "Beer",
      args: {
        where: arg({
          type: "BeersWhereInput"
        })
      },
      resolve: (_, { where }, ctx) => {
        if (where && where.name) return ctx.beer.findBeersByName(where.name);

        return ctx.beer.findBeers();
      }
    });
  }
});

export default Query;
