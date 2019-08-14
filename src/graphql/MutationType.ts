import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { mutationType, stringArg, floatArg, intArg } from "nexus";

import { notExistError, getUserId } from "../utils";

const SALT_METHOD = process.env.SALT_METHOD;

const Mutation = mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        displayName: stringArg({ nullable: true }),
        userName: stringArg(),
        password: stringArg()
      },
      resolve: async (_, { displayName, userName, password }, ctx) => {
        const trimmed = userName.replace(/\s/g, "");
        const userNameExists = await ctx.photon.users
          .findOne({
            where: { userName: trimmed }
          })
          .catch(notExistError);

        if (userNameExists)
          throw new Error(`Username ${trimmed} is already taken.`);

        if (!password.match(/^(?=.*\d).{4,12}$/))
          throw new Error(
            "Password must be between 4 and 12 digits long and include at least one numeric digit."
          );

        const hashedPassword = await hash(password, 10);
        const user = await ctx.photon.users.create({
          data: {
            displayName,
            userName: trimmed,
            password: hashedPassword
          }
        });

        return {
          token: sign({ userId: user.id }, SALT_METHOD),
          user
        };
      }
    });

    t.field("login", {
      type: "AuthPayload",
      args: {
        userName: stringArg(),
        password: stringArg()
      },
      resolve: async (_, { userName, password }, ctx) => {
        const user = await ctx.photon.users.findOne({
          where: { userName }
        });

        if (!user) throw new Error(`No user found for user name ${userName}`);

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) throw new Error("Invalid password");

        return {
          token: sign({ userId: user.id }, SALT_METHOD),
          user
        };
      }
    });

    t.field("createReview", {
      type: "Review",
      args: {
        beerId: intArg({ required: true }),
        comment: stringArg({ required: true }),
        rating: floatArg({ required: true })
      },
      resolve: async (_, { beerId, comment, rating }, ctx) => {
        if (rating < 0 || rating > 5)
          throw new Error("Ratings must be between 1-5");

        const userId: string = getUserId(ctx);
        const review = await ctx.photon.reviews.create({
          data: {
            beerId,
            comment,
            rating,
            userId
          }
        });

        return review;
      }
    });
  }
});

export default Mutation;
