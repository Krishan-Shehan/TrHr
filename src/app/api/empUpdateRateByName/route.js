import connectToDB from "@/database";
import projects from "@/models/projects";
import employees from "@/models/employee";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        
        const extractProjectData = await projects.find({projectName:extractData.projectName});

        const empdata = await employees.find({name:extractData.empName})
        
        console.log("🚀 ~ POST ~ empdata:", empdata[0].rateting)
        const newRate = (empdata[0].rateting + extractData.rate + extractProjectData[0].cRate) / empdata[0].projectCount
        console.log("🚀 ~ POST ~ newRate:", newRate)

        const employeeData = await employees.updateOne({ name: extractData.empName }, { $set: { rateting: newRate} })
        console.log("🚀 ~ POST ~ employeeData:", employeeData)

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