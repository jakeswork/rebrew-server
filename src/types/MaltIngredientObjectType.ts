import { objectType } from "@prisma/nexus";

const MaltIngredient = objectType({
  name: "MaltIngredient",
  definition(t) {
    t.implements("Ingredient");
  }
});

export default MaltIngredient;
