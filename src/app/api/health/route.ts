import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            success: true,
            message: "Database connected successfully!",
        });
    }catch(err){

        console.error("Database connection error:",err);
        return NextResponse.json({
            success: false,
            message: "Database connection failed",
            error:
          err instanceof Error
            ? err.message
            : "Unknown error",
        },
    {status: 500})
    }
}