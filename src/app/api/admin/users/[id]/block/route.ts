import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method PATCH
 * @route  /api/admin/users/:id/block
 * @access Admin only
 */

interface Props {
  params: Promise<{ id: string }>;
}
export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const admin = verifyToken(request);

    if (!admin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!admin.isAdmin)
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 },
      );

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (user.isAdmin)
      return NextResponse.json(
        { message: "Cannot block admin user" },
        { status: 400 },
      );

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        isBlocked: body.isBlocked,
      },
    });

    return NextResponse.json(
      {
        message: updatedUser.isBlocked
          ? "User blocked successfully"
          : "User unblocked successfully",
        user: updatedUser,
      },
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
