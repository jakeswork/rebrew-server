import { objectType } from "@prisma/nexus";

const Method = objectType({
  name: "Method",
  definition(t) {
    t.list.field("mashTemp", {
      type: "BeerMashTemp"
    });
    t.field("fermentation", {
      type: "BeerFermentation"
    });
    t.string("twist", {
      nullable: true
    });
  }
});

export default Method;
