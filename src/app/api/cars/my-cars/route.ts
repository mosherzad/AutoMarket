import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/cars/my-cars
 * @access private
 */
export async function GET(request: NextRequest) {
  try {
    const userFromToken = verifyToken(request);
    if (!userFromToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const myCars = await prisma.car.findMany({
      where: { userId: userFromToken.id },
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(myCars, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
