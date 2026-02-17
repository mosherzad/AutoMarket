import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestCars = await prisma.car.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { images: { take: 1 } },
    });
    return NextResponse.json(latestCars, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
