import { CarStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method GET
 * @route ~/api/admin/cars/available
 * @access private
 */

export async function GET(request: NextRequest) {
  try {
    const admin = verifyToken(request);

    if (!admin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!admin.isAdmin)
      return NextResponse.json({ message: " Admin access required" });

    const count = await prisma.car.count({
      where: { status: CarStatus.AVAILABLE },
    });
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
