import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        const extractEmployeetData = await employees.find();

        if (extractEmployeetData) {
            return NextResponse.json({
                success: true,
                data: extractEmployeetData,
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No extractEmployeetData found",
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