import { interfaceType } from "@prisma/nexus";

const BeerTemp = interfaceType({
  name: "BeerTemp",
  definition(t) {
    t.field("temp", {
      type: "Amount"
    });
    t.resolveType(() => null);
  }
});

export default BeerTemp;
