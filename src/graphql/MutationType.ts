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
        display_name: stringArg({ nullable: true }),
        user_name: stringArg({ required: true }),
        password: stringArg({ required: true })
      },
      resolve: async (_, { display_name, user_name, password }, ctx) => {
        const trimmed = user_name.replace(/\s/g, "");
        const userNameExists = await ctx.photon.users
          .findOne({
            where: { user_name: trimmed }
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
            display_name,
            user_name: trimmed,
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
        user_name: stringArg({ required: true }),
        password: stringArg({ required: true })
      },
      resolve: async (_, { user_name, password }, ctx) => {
        try {
          const user = await ctx.photon.users.findOne({
            where: { user_name }
          });

          const passwordValid = await compare(password, user.password);

          if (!passwordValid) throw new Error("Invalid password");

          return {
            token: sign({ userId: user.id }, SALT_METHOD),
            user
          };
        } catch (notExistError) {
          throw new Error(`${user_name} does not exist.`);
        }
      }
    });

    t.field("create_review", {
      type: "Review",
      args: {
        beer_id: intArg({ required: true }),
        comment: stringArg({ required: true }),
        rating: floatArg({ required: true })
      },
      resolve: async (_, { beer_id, comment, rating }, ctx) => {
        if (rating < 0 || rating > 5)
          throw new Error("Ratings must be between 1-5");

        const user_id: string = getUserId(ctx);
        const review = await ctx.photon.reviews.create({
          data: {
            beer_id,
            comment,
            rating,
            user_id
          }
        });

        return review;
      }
    });
  }
});

export default Mutation;
