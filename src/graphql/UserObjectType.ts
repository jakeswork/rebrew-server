import { objectType } from "@prisma/nexus";

const User = objectType({
  name: "User",
  description:
    "A user is an individual's account on Rebrew that owns reviews and can make new reviews.",
  definition(t) {
    t.model.id();
    t.model.display_name();
    t.model.user_name();
    t.list.field("reviews_made", {
      nullable: true,
      type: "Review",
      resolve: (user, _, ctx) =>
        ctx.photon.reviews.findMany({
          where: {
            user_id: user.id
          }
        })
    });
  }
});

export default User;
