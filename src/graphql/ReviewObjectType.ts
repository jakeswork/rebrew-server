import { objectType } from "@prisma/nexus";
import { User } from "@generated/photon";

const Review = objectType({
  name: "Review",
  description: "A Review is a response to a Beer.",
  definition(t) {
    t.model.id();
    t.field("user", {
      type: "User",
      resolve: (review, _, ctx): Promise<User> =>
        ctx.photon.users.findOne({
          where: {
            id: review.user_id
          }
        })
    });
    t.field("beer", {
      type: "Beer",
      resolve: (review, _, ctx) => ctx.beer.findBeerById(review.beer_id)
    });
    t.model.rating();
    t.model.comment();
  }
});

export default Review;
