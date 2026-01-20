import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method DELETE
 * @route  /api/admin/cars/:id
 * @access Admin only
 */

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const admin = verifyToken(request);

    if (!admin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!admin.isAdmin)
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );

    const carPost = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!carPost)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    await prisma.car.delete({ where: { id: parseInt(id) } });

    return NextResponse.json(
      { message: "The post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
