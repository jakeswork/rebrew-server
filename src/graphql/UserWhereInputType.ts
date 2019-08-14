import { inputObjectType, arg } from "@prisma/nexus";

const UserWhereInput = inputObjectType({
  name: "UserWhereInput",
  definition(t) {
    t.id("id");
    t.string("userName");
  }
});

export const userInputArg = {
  where: arg({
    type: "UserWhereInput",
    required: true
  })
};

export default UserWhereInput;
