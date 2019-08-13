import { objectType } from "@prisma/nexus";

const Beer = objectType({
  name: "Beer",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("tagline");
    t.string("firstBrewed");
    t.string("description");
    t.string("imageUrl");
    t.float("abv");
    t.float("ibu", {
      nullable: true
    });
    t.int("ebc", {
      nullable: true
    });
    t.float("ph", {
      nullable: true
    });
    t.field("volume", {
      type: "Amount"
    });
    t.field("boilVolume", {
      type: "Amount"
    });
    t.field("ingredients", {
      type: "Recipie"
    });
    t.list.string("foodPairing");
    t.string("brewersTips");
    t.string("contributedBy");
    t.field("method", {
      type: "Method"
    });
  }
});

export default Beer;
