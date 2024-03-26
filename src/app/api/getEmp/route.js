import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";


export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        const empdata = await employees.find({ $and: [{ "name": extractData.empName },{ "skills": extractData.empSkill }, { "designation": extractData.empRole }] });
        console.log("🚀 ~ POST ~ empdata:", empdata)
        
        return NextResponse.json({
            success: true,
            message: "successful!",
            empdata : empdata,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Faild!",
        });
    }
}