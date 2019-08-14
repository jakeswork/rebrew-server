import { objectType } from "@prisma/nexus";
import { Review } from "@generated/photon";

const Beer = objectType({
  name: "Beer",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("tagline");
    t.string("first_brewed");
    t.string("description");
    t.string("image_url");
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
    t.field("boil_volume", {
      type: "Amount"
    });
    t.field("ingredients", {
      type: "Recipie"
    });
    t.list.string("food_pairing");
    t.string("brewers_tips");
    t.string("contributed_by");
    t.field("method", {
      type: "Method"
    });
    t.list.field("reviews", {
      nullable: true,
      type: "Review",
      resolve: async (beer, _, ctx): Promise<Review[] | null> => {
        const reviews = await ctx.photon.reviews.findMany({
          where: {
            beer_id: beer.id
          }
        });

        return reviews ? reviews : null;
      }
    });
    t.field("average_rating", {
      nullable: true,
      type: "Float",
      resolve: async (beer, _, ctx): Promise<number> => {
        const reviews = await ctx.photon.reviews.findMany({
          where: {
            beer_id: beer.id
          }
        });
        const total: number = reviews.reduce(
          (acc: number, curr: Review) => acc + curr.rating,
          0
        );

        return total / reviews.length;
      }
    });
  }
});

export default Beer;
