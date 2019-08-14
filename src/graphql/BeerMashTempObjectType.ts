import { objectType } from "@prisma/nexus";

const BeerMashTemp = objectType({
  name: "BeerMashTemp",
  definition(t) {
    t.implements("BeerTemp");
    t.int("duration", {
      nullable: true
    });
  }
});

export default BeerMashTemp;
