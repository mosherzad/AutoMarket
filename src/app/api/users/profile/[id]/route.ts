import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { UpdateProfileDto } from "@/lib/dtos";
import { updateProfileSchema } from "@/lib/validationSchema";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/verifyToken";

/**
 * @method DELETE
 * @route  ~/api/users/delete
 * @description Delete Profile
 * @access private only for user him/her self
 * */

interface Prop {
  params: Promise<{ id: string }>;
}
export async function DELETE(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!user)
      return NextResponse.json(
        { message: "The account you try access is not exists" },
        { status: 404 }
      );

    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (userFromToken.isBlocked)
      return NextResponse.json(
        { message: "Your account is blocked, you cannot delete you account" },
        { status: 403 }
      );

    if (userFromToken.id !== user.id)
      return NextResponse.json(
        { message: "You can only delete you account" },
        { status: 403 }
      );

    await prisma.user.delete({ where: { id: parseInt(id) } });
    return NextResponse.json(
      { message: "Your account has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route  ~/api/users/profile
 * @description Update Profile
 * @access private only for user him/her self
 * */

export async function PUT(request: NextRequest, { params }: Prop) {
  const { id } = await params;
  try {
    const body = (await request.json()) as UpdateProfileDto;
    const validation = updateProfileSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user)
      return NextResponse.json(
        { message: "user is not exists" },
        { status: 404 }
      );

    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (userFromToken.isBlocked)
      return NextResponse.json(
        {
          message: "Your account has been blocked, you cannot edit you profile",
        },
        { status: 403 }
      );
    if (userFromToken.id === user.id) {
      let hashedPassword: string | undefined;
      if (body.password?.trim()) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(body.password, salt);
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          username: body.username,
          email: body.email,
          password: hashedPassword,
          phoneNumber: body.phoneNumber,
          img: body.img,
        },
      });

      return NextResponse.json({ updatedUser }, { status: 200 });
    }

    return NextResponse.json(
      { message: "You are not allowed to update data of this account" },
      { status: 403 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route  ~/api/users/profile
 * @description GET Profile
 * @access private only for user him/her self
 * */

export async function GET(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      return NextResponse.json(user, { status: 200 });
    }

    return NextResponse.json(
      { message: "You are not allowed to access this account" },
      { status: 403 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
