import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTPayload } from "./types";
export const verifyToken = (request: NextRequest) => {
  try {
    const cookie = request.cookies.get("jwtToken");
    const token = cookie?.value;

    if (!token) return null;
    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    return userPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const verifyTokenForPage = (token: string): JWTPayload | null => {
  try {
    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;
    if (!userPayload) return null;

    return userPayload;
  } catch (error) {
    return null;
  }
};
