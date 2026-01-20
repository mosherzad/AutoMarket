import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

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

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const deleteUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "User deleted successfully", user: deleteUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
