import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method GET
 * @route ~/api/cars/:id
 * @access public
 */

interface Prop {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;
    const singleCar = await prisma.car.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            username: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        images: true,
      },
    });

    if (!singleCar)
      return NextResponse.json(
        { message: "The post is not exists" },
        { status: 404 }
      );

    return NextResponse.json(singleCar, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/cars/:id
 * @access private
 */

export async function PUT(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;
    const body = await request.json();

    const car = await prisma.car.findUnique({
      where: { id: parseInt(id) },
      include: { images: true },
    });

    if (!car)
      return NextResponse.json(
        { message: "The post you try to update is not exists" },
        { status: 404 }
      );
    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (userFromToken.isBlocked)
      return NextResponse.json(
        { message: "Your account is blocked. You cannot update post" },
        { status: 403 }
      );
    if (userFromToken && userFromToken.id === car.userId) {
      const existingImages = car.images.map((i) => i.url);
      const incomingImages = body.images;

      const toDelete = existingImages.filter(
        (url) => !incomingImages.includes(url)
      );
      const toAdd = incomingImages.filter(
        (url: string) => !existingImages.includes(url)
      );
      const updatedPost = await prisma.car.update({
        where: { id: parseInt(id) },
        data: {
          brand: body.brand,
          description: body.description,
          price: body.price,
          mileage: body.mileage,
          status: body.status,
          fuel: body.fuel,
          transmission: body.transmission,
          carType: body.carType,
          year: body.year,
          location: body.location,
          cylinder: body.cylinder,
          contactNumber: body.contactNumber,
          images: {
            deleteMany: { url: { in: toDelete } },
            create: toAdd.map((url: string) => ({ url })),
          },
        },
      });
      return NextResponse.json(updatedPost, { status: 200 });
    }
    return NextResponse.json(
      { message: "You are not allowed to update this post" },
      { status: 403 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/cars/:id
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;

    const userFromToken = verifyToken(request);

    if (!userFromToken)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (userFromToken.isBlocked)
      return NextResponse.json(
        {
          message: "Your account has been blocked, you cannot delete the post",
        },
        { status: 403 }
      );

    const carPost = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!carPost)
      return NextResponse.json(
        { message: "The post is not exists" },
        { status: 404 }
      );

    if (userFromToken.id === carPost.userId) {
      await prisma.car.delete({ where: { id: parseInt(id) } });

      return NextResponse.json(
        { message: "The post deleted successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "You are not allowed to delete this post" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error ${error}` },
      { status: 500 }
    );
  }
}
