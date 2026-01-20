import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userFromToken = verifyToken(request);
    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const favorites = await prisma.favorite.findMany({
      where: { userId: userFromToken.id },
      include: { car: { include: { images: { take: 1 } } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
