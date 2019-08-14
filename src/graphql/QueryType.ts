import { queryType } from "nexus";

import { getUserId } from "../utils";
import { userInputArg } from "./UserWhereInputType";
import { beerInputArg } from "./BeerWhereInputType";
import { beersInputArg } from "./BeersWhereInputType";

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
      args: userInputArg,
      resolve: (_, { where }, ctx) => {
        return ctx.photon.users.findOne({
          where
        });
      }
    });

    t.field("beer", {
      type: "Beer",
      args: beerInputArg,
      resolve: (_, { where: { id } }, ctx) => {
        if (!id) throw new Error("Provide an id to search for.");

        return ctx.beer.findBeerById(id);
      }
    });

    t.list.field("beers", {
      type: "Beer",
      args: beersInputArg,
      resolve: (_, { where }, ctx) => {
        if (where && where.name) return ctx.beer.findBeersByName(where.name);

        return ctx.beer.findBeers();
      }
    });
  }
});

export default Query;
