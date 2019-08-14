import { objectType } from "@prisma/nexus";

const User = objectType({
  name: "User",
  description:
    "A user is an individual's account on Rebrew that owns reviews and can make new reviews.",
  definition(t) {
    t.model.id();
    t.model.displayName();
    t.model.userName();
    t.list.field("reviewsMade", {
      nullable: true,
      type: "Review",
      resolve: (user, _, ctx) =>
        ctx.photon.reviews.findMany({
          where: {
            userId: user.id
          }
        })
    });
  }
});

export default User;
