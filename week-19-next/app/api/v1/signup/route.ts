import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../lib/db";


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const user = await prismaClient.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });

    console.log(user);

    return NextResponse.json({
      message: "You have been signed up",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Error during user sign-up:", error);
    return NextResponse.json(
      { error: "An error occurred while signing up." },
      { status: 500 }
    );
  } 
}
