import connectToDB from "@/database";
import projects from "@/models/projects";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {

    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const getProjectData = await projects.find({ _id: id })
        console.log("🚀 ~ GET ~ getProjectData:", getProjectData);
        if (getProjectData != "") {
            return NextResponse.json({
                success: true,
                data: getProjectData,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to get class by id ! Please try again",
            });
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }

}