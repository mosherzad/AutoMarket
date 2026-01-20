import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout User logout
 * @access private
 */
export async function GET() {
  try {
    const storeCookie = await cookies();
    storeCookie.delete("jwtToken");
    return NextResponse.json({ message: "Logout" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 }
    );
  }
}
