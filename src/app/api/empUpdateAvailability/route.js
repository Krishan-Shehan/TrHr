import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)


    try {

        for (let index = 0; index < extractData.employees.length; index++) {
            const empArry = extractData.employees[index];

            const hrs = (extractData.skills[index].percentage / 100) * extractData.mnhr;
            console.log("🚀 ~ POST ~ hrs:", hrs)


            for (let index = 0; index < empArry.length; index++) {
                const element = empArry[index];
                console.log("🚀 ~ POST ~ element:", element)
                
                try {
                    console.log("🚀 ~ POST ~ element:", element[0].Availability)
                    const upval = element[0].Availability - hrs
                    const updateLvl2Ref = await employees.updateOne({ name: element[0].name}, { $set: { Availability: upval, projectCount: element[0].projectCount + 1 } })
                    console.log("🚀 ~ POST ~ updateLvl2Ref:", updateLvl2Ref)

                } catch (error) {    
                    const upval = element.Availability - hrs
                    const updateLvl2Ref = await employees.updateOne({ name: element.name}, { $set: { Availability: upval, projectCount: element.projectCount + 1 } })
                    console.log("🚀 ~ POST ~ updateLvl2Ref:", updateLvl2Ref)
                }

            }
            
        }

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