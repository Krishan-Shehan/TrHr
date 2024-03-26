import connectToDB from "@/database";
import projects from "@/models/projects";

import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀 ~ POST ~ extractData:", extractData)

    try {
        const data = await projects.create(extractData)
        // console.log("🚀 ~ POST ~ data:", data)
        
        return NextResponse.json({
            success: true,
            message: "Created successful!",
        });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json({
            success: false,
            message: "Faild!",
        });
    }

}