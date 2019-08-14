import { objectType } from "@prisma/nexus";

const Recipie = objectType({
  name: "Recipie",
  definition(t) {
    t.list.field("malt", {
      type: "MaltIngredient"
    });
    t.list.field("hops", {
      type: "HopsIngredient"
    });
    t.string("yeast");
  }
});

export default Recipie;
