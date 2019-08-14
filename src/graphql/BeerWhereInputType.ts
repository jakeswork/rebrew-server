import { inputObjectType, arg } from "@prisma/nexus";

const BeerWhereInput = inputObjectType({
  name: "BeerWhereInput",
  definition(t) {
    t.int("id");
  }
});

export const beerInputArg = {
  where: arg({
    type: "BeerWhereInput",
    required: true
  })
};

export default BeerWhereInput;
