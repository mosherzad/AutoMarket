import { POST_PER_PAGE_ADMIN } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method GET
 * @route ~/api/admin/cars
 * @access private
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNumber = searchParams.get("pageNumber") || "1";
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

    const cars = await prisma.car.findMany({
      skip: POST_PER_PAGE_ADMIN * (parseInt(pageNumber) - 1),
      take: POST_PER_PAGE_ADMIN,
      orderBy: { createdAt: "desc" },
      select: {
        brand: true,
        carType: true,
        price: true,
        year: true,
        status: true,
      },
    });

    return NextResponse.json({ cars }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "interval server error" },
      { status: 500 },
    );
  }
}
