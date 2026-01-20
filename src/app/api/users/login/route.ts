import prisma from "@/lib/prisma";
import { JWTPayload } from "@/lib/types";
import { loginUserSchema } from "@/lib/validationSchema";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { setCookie } from "@/lib/generateToken";
/**
 * @method POST
 * @route  ~/api/users/login
 * @description login
 * @access public
 * */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginUserSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user)
      return NextResponse.json(
        { message: "This account does not found" },
        { status: 404 },
      );
    const isMatchPassword = await bcrypt.compare(body.password, user.password);

    if (!isMatchPassword)
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 },
      );

    const jwtPayload: JWTPayload = {
      username: user.username,
      id: user.id,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    };

    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      { message: `Authenticated` },
      { status: 200, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 },
    );
  }
}
