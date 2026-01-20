import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";
export const generateToken = (jwtPayload: JWTPayload) => {
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "3d",
  });

  return token;
};

export const setCookie = (jwtToken: JWTPayload) => {
  const token = generateToken(jwtToken);

  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return cookie;
};
