import { verify } from "jsonwebtoken";

import { Context } from "./types";

const SALT_METHOD = process.env.SALT_METHOD;

interface Token {
  userId: string;
}

export function getUserId(context: Context): string {
  const Authorization: string = context.request.get("Authorization");

  if (!Authorization) return null;

  const token: string = Authorization.replace("Bearer ", "");
  const verifiedToken: Token = verify(token, SALT_METHOD) as Token;

  return verifiedToken && verifiedToken.userId;
}

export const notExistError = (err: Error): null | Error =>
  err.message.match(/Record does not exist/i) ? null : err;
