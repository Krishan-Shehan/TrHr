import connectToDB from "@/database";
import projects from "@/models/projects";

import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        const projectDetails = await projects.updateOne({ projectName: extractData.projectName }, { $set: { projectStatus: 1} })
        const extractProjectData = await projects.find({projectName:extractData.projectName});
        
        console.log("🚀 ~ POST ~ projectDetails:", projectDetails)
        console.log("🚀 ~ POST ~ extractProjectData:", extractProjectData[0]._id)
        return NextResponse.json({
            success: true,
            message: "Created successful!",
            data:extractProjectData[0]._id,
        });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json({
            success: false,
            message: "Faild!",
        });
    }

}