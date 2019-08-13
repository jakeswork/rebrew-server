import { objectType } from "@prisma/nexus";

const Amount = objectType({
  name: "Amount",
  definition(t) {
    t.float("value");
    t.string("unit");
  }
});

export default Amount;
