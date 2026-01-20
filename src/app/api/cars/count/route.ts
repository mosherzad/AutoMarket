import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand")?.trim();
    const status = searchParams.get("status");
    const carType = searchParams.get("carType");
    const fuel = searchParams.get("fuel");
    const cylinder = searchParams.get("cylinder");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};

    if (brand) {
      where.brand = {
        contains: brand,
        mode: "insensitive",
      };
    }

    if (status) where.status = status;
    if (carType) where.carType = carType;
    if (fuel) where.fuel = fuel;
    if (cylinder) where.cylinder = cylinder;

    if (maxPrice || minPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const count = await prisma.car.count({ where });
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
