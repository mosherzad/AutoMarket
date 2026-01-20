import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const admin = verifyToken(request);

    if (!admin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!admin.isAdmin)
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 },
      );

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        isBlocked: true,
        createdAt: true,
        _count: {
          select: { cars: true },
        },
      },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const usersSevenDaysAgoCount = await prisma.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });
    return NextResponse.json(
      { users, usersSevenDaysAgoCount },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
