import { objectType } from "@prisma/nexus";

const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  }
});

export default AuthPayload;
