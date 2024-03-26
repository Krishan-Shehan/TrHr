import connectToDB from "@/database";
import projects from "@/models/projects";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        const extractProjectData = await projects.find();

        if (extractProjectData) {
            return NextResponse.json({
                success: true,
                data: extractProjectData,
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No extractProjectData found",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}