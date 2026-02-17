import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/cars
 * @access public
 */

export async function GET() {
  try {
    const allCars = await prisma.car.findMany({ include: { images: true } });

    return NextResponse.json(allCars, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
