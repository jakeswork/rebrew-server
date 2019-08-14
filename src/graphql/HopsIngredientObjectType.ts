import { objectType } from "@prisma/nexus";

const HopsIngredient = objectType({
  name: "HopsIngredient",
  definition(t) {
    t.implements("Ingredient");
    t.string("add");
    t.string("attribute");
  }
});

export default HopsIngredient;
