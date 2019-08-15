import { inputObjectType } from "@prisma/nexus";

const BeersWhereInput = inputObjectType({
  name: "BeersWhereInput",
  definition(t) {
    t.string("name", { nullable: true });
  }
});

export default BeersWhereInput;
