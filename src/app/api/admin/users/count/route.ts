import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method GET
 * @route ~/api/admin/users // get numbers of users
 * @access private
 */

export async function GET(request: NextRequest) {
  try {
    const admin = verifyToken(request);

    if (!admin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!admin.isAdmin)
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );

    const count = await prisma.user.count();

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
