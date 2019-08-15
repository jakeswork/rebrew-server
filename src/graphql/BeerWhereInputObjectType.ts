import { inputObjectType } from "@prisma/nexus";

const BeerWhereInput = inputObjectType({
  name: "BeerWhereInput",
  definition(t) {
    t.int("id", { required: true });
  }
});

export default BeerWhereInput;
