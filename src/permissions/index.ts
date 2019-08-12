import { rule, shield } from "graphql-shield";

import { getUserId } from "../utils";

export const rules = {
  isAuthenticatedUser: rule()((a, b, ctx) => {
    const userId: string = getUserId(ctx);

    return Boolean(userId);
  })
};

export const permissions = shield({
  Query: {
    viewer: rules.isAuthenticatedUser
  }
});
