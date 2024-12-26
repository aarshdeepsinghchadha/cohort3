import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../lib/db";

export async function POST(req: NextRequest){
    try{
        const data = await req.json();

        const user = await prismaClient.user.findUnique({
            where:{
                username: data.username
            }
        });

        if (!user || user.password !== data.password) {
            return NextResponse.json(
              { message: "Invalid username or password" },
              { status: 401 }
            );
          }
      
          return NextResponse.json({
            message: "You have been signed in",
            user: { id: user.id, username: user.username },
          });
    }
    catch(e: any){
        return NextResponse.json(
            { error: `An error occurred while signing in: ${e.message}` },
            { status: 500 }
          );
    }
} 