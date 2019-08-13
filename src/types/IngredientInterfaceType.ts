import { interfaceType } from "@prisma/nexus";

const Ingredient = interfaceType({
  name: "Ingredient",
  definition(t) {
    t.string("name");
    t.field("amount", {
      type: "Amount"
    });
    t.resolveType(() => null);
  }
});

export default Ingredient;
