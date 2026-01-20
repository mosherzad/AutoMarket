/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Car } from "@/generated/prisma/client";
import { createPostSchema } from "@/lib/validationSchema";
import { verifyToken } from "@/lib/verifyToken";
import { POST_PER_PAGE } from "@/lib/constants";

/**
 * @method GET
 * @route ~/api/cars
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNumber = searchParams.get("pageNumber") || "1";
    const brand = searchParams.get("brand");
    const carType = searchParams.get("carType");
    const status = searchParams.get("status");
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
    if (cylinder) {
      where.cylinder = Number(cylinder);
    }
    if (carType) {
      where.carType = carType;
    }
    if (fuel) {
      where.fuel = fuel;
    }
    if (status) {
      where.status = status;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const total = await prisma.car.count({ where });
    const cars = await prisma.car.findMany({
      where,
      skip: POST_PER_PAGE * (parseInt(pageNumber) - 1),
      take: POST_PER_PAGE,
      include: { images: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ cars, total }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method POST
 * @route ~/api/cars
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json(
        { message: "Only logged in user can post car" },
        { status: 401 },
      );

    if (userFromToken.isBlocked)
      return NextResponse.json(
        { message: "Your account has been blocked, you cannot list your car" },
        { status: 403 },
      );
    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.issues[0]?.message || "Invalid input",
        },
        { status: 400 },
      );
    }

    const newPost: Car = await prisma.car.create({
      data: {
        brand: body.brand,
        year: body.year,
        mileage: body.mileage,
        description: body.description,
        location: body.location,
        carType: body.carType,
        cylinder: body.cylinder,
        price: body.price,
        fuel: body.fuel,
        status: body.status,
        contactNumber: body.contactNumber,
        transmission: body.transmission,
        userId: userFromToken.id,
        images:
          body.images && body.images.length > 0
            ? {
                createMany: {
                  data: body.images.map((url: string) => ({ url })),
                },
              }
            : undefined,
      },
      include: { images: true },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 },
    );
  }
}
