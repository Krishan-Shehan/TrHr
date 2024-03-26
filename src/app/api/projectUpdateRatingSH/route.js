import connectToDB from "@/database";
import projects from "@/models/projects";
import employees from "@/models/employee";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        const projectDetails = await projects.updateOne({ projectName: extractData.projectName }, { $set: { sRate: extractData.projectrating} })
        const extractProjectData = await projects.find({projectName:extractData.projectName});
        
        console.log("🚀 ~ POST ~ projectDetails:", projectDetails)
        console.log("🚀 ~ POST ~ extractProjectData:", extractProjectData)

        const emp = extractProjectData[0].employees
        console.log("🚀 ~ POST ~ emp:", emp)

        for (let index = 0; index < emp.length; index++) {
            const element = emp[index];
            console.log("🚀 ~ POST ~ element:", element[0].projectCount)
            const empuprate = (extractProjectData[0].cRate + extractProjectData[0].sRate ) + element[0].rateting
            console.log("🚀 ~ POST ~ empuprate:", empuprate / element[0].projectCount)
            const employeeData = await employees.updateOne({ name: element[0].name }, { $set: { rateting: empuprate / element[0].projectCount} })
            console.log("🚀 ~ POST ~ employeeData:", employeeData)
        }
        
        
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