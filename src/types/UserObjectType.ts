import { objectType } from "@prisma/nexus";

const AuthenticatedUser = objectType({
  name: "User",
  description:
    "A user is an individual's account on Rebrew that owns reviews and can make new reviews.",
  definition(t) {
    t.model.id();
    t.model.displayName();
    t.model.userName();
  }
});

export default AuthenticatedUser;
