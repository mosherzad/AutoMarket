import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (userFromToken.isBlocked)
      return NextResponse.json(
        {
          message: "Your account has been blocked, you cannot add to favorites",
        },
        { status: 403 }
      );

    const carPost = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!carPost)
      return NextResponse.json(
        { message: "The post not found" },
        { status: 404 }
      );
    await prisma.favorite.create({
      data: { userId: userFromToken.id, carId: carPost.id },
    });
    return NextResponse.json(
      { message: "The post added to favorite successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (userFromToken.isBlocked)
      return NextResponse.json(
        {
          message:
            "Your account has been blocked, you cannot remove from favorites",
        },
        { status: 403 }
      );
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId: userFromToken.id,
          carId: parseInt(id),
        },
      },
    });

    if (!favorite)
      return NextResponse.json({ message: "Already removed" }, { status: 200 });

    if (userFromToken.id === favorite.userId) {
      await prisma.favorite.delete({
        where: {
          userId_carId: { userId: userFromToken.id, carId: parseInt(id) },
        },
      });
      return NextResponse.json(
        { message: "Removed from favorites" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
