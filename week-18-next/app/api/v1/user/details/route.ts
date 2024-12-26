import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        user: "aarshdeep",
        email: "aarshdeep@gmail.com"
    })
}