"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation";


export default function MiddlePage() {
    const params = useParams();
    console.log("🚀 ~ MiddlePage ~ params:", params["data-arr"])
    const data = params["data-arr"];
    if (data) {
        console.log("Data:", data[1]);
        // Now you can access specific properties of the data object
        // For example:
        // const skill1 = data.skill1;
        // const skill2 = data.skill2;
    }
    const router = useRouter();
    return (
        <div className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
            <div className="flex flex-col">
                <div>
                    f
                </div>
                <div>
                    <span>Best Option</span>

                    <div className="flex flex-col">
                        <span>for skill 1: user1</span>
                        <span>for skill 2: user2</span>
                    </div>
                    <div className="flex flex-row gap-2 justify-end">
                        <button className="p-1 bg-slate-400 rounded">view</button>
                        <button className="p-1 bg-slate-400 rounded">edit</button>
                    </div>
                </div>
                <div>
                    <span>Avg Option</span>
                    <div className="flex flex-col">
                        <span>for skill 1: user1</span>
                        <span>for skill 2: user2</span>
                    </div>
                    <div className="flex flex-row gap-2 justify-end">
                        <button className="p-1 bg-slate-400 rounded">view</button>
                        <button className="p-1 bg-slate-400 rounded">edit</button>
                    </div>
                </div>
                <div>
                    <span>Cost Option</span>
                    <div className="flex flex-col">
                        <span>for skill 1: user1</span>
                        <span>for skill 2: user2</span>
                    </div>
                    <div className="flex flex-row gap-2 justify-end">
                        <button className="p-1 bg-slate-400 rounded">view</button>
                        <button className="p-1 bg-slate-400 rounded">edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}