import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(request: NextRequest) {
  try {
    const admin = verifyToken(request);

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!admin.isAdmin) {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 },
      );
    }

    const count = await prisma.car.count();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const carsSevenDaysAgoCount = await prisma.car.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });
    return NextResponse.json({ count, carsSevenDaysAgoCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
