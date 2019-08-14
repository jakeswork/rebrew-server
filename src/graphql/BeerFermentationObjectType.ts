import { objectType } from "@prisma/nexus";

const BeerFermentation = objectType({
  name: "BeerFermentation",
  definition(t) {
    t.implements("BeerTemp");
  }
});

export default BeerFermentation;
