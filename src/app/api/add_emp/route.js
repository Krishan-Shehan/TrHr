import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀 ~ POST ~ extractData:", extractData)

    try {
        const data = await employees.create(extractData)
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