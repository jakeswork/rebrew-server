import { objectType } from "@prisma/nexus";
import { Review } from "@generated/photon";

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
    t.list.field("reviews", {
      nullable: true,
      type: "Review",
      resolve: async (beer, _, ctx): Promise<Review[] | null> => {
        const reviews = await ctx.photon.reviews.findMany({
          where: {
            beerId: beer.id
          }
        });

        return reviews ? reviews : null;
      }
    });
    t.field("averageRating", {
      nullable: true,
      type: "Float",
      resolve: async (beer, _, ctx): Promise<number> => {
        const reviews = await ctx.photon.reviews.findMany({
          where: {
            beerId: beer.id
          }
        });
        const total: number = reviews.reduce(
          (acc: number, curr) => acc + curr.rating,
          0
        );

        return total / reviews.length;
      }
    });
  }
});

export default Beer;
