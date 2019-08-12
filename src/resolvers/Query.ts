import { queryType, stringArg } from "nexus";

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
  }
});

export default Query;
