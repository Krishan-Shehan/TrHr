import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";


export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        let allempdata = [];

        for (let index = 0; index < extractData.empSkill.length; index++) {
            const element = extractData.empSkill[index].skill;
            console.log("🚀 ~ POST ~ element:", element)
            const empdata = await employees.find({ "skills": element });
            console.log("🚀 ~ POST ~ empdata:", empdata)
            allempdata.push(empdata)
        }
        
        console.log("🚀 ~ POST ~ empdata:", allempdata)
        
        return NextResponse.json({
            success: true,
            message: "successful!",
            empdata : allempdata,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Faild!",
        });
    }
}