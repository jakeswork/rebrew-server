import { inputObjectType, arg } from "@prisma/nexus";

const BeersWhereInput = inputObjectType({
  name: "BeersWhereInput",
  definition(t) {
    t.string("name", { nullable: true });
  }
});

export const beersInputArg = {
  where: arg({
    type: "BeersWhereInput"
  })
};

export default BeersWhereInput;
