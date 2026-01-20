import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { createUserSchema } from "@/lib/validationSchema";
import { JWTPayload } from "@/lib/types";
import { setCookie } from "@/lib/generateToken";
import { CreateUserDto } from "@/lib/dtos";

/**
 * @method POST
 * @route ~/api/users/register
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateUserDto;
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.issues[0].message || "Invalid input",
        },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        { message: "The account is already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });

    const jwtPayload: JWTPayload = {
      username: newUser.username,
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      isBlocked: newUser.isBlocked,
    };

    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      { newUser },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
