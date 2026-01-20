import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/car/search
 * @access public
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json([], { status: 200 });
    }

    const cars = await prisma.car.findMany({
      where: {
        status: { in: ["AVAILABLE", "SOLD"] },
        OR: [
          { brand: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        images: { take: 1 },
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
