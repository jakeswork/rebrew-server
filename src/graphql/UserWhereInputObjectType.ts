import { inputObjectType } from "@prisma/nexus";

const UserWhereInput = inputObjectType({
  name: "UserWhereInput",
  definition(t) {
    t.id("id", { nullable: true });
    t.string("user_name", { nullable: true });
  }
});

export default UserWhereInput;
