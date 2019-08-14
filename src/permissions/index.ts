import { rule, shield } from "graphql-shield";

import { getUserId } from "../utils";

export const rules = {
  isAuthenticatedUser: rule()((a, b, ctx) => {
    const user_id: string = getUserId(ctx);

    return Boolean(user_id);
  })
};

export const permissions = shield({
  Query: {
    viewer: rules.isAuthenticatedUser
  },
  Mutation: {
    create_review: rules.isAuthenticatedUser
  }
});
