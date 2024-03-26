"use client"

import { getProjectsData, updateProjectData } from "@/services/project";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar";

export default function AllProjects() {
    const [ProjectData, setProjectData] = useState("")
    const [LinkData, setlink] = useState("")
    const [projectName, setprojectName] = useState("")
    const [showDialog, setShowDialog] = useState(false)

    const router = useRouter();

    async function handleProjectsData() {
        const testVal = await getProjectsData();
        console.log("🚀 ~ handleProjectsData ~ testVal:", testVal.data)
        return testVal.data
    }

    useEffect(() => {

        const fetchData = async () => {
            const data = await handleProjectsData();
            setProjectData(data);
        };

        fetchData();
    }, [showDialog]);

    async function handelProjectFinish(projectName) {
        console.log("🚀 ~ handelProjectFinish ~ x:", projectName)
        const getfeedBackLink = await updateProjectData(projectName);
        console.log("🚀 ~ handelProjectFinish ~ getfeedBackLink:", getfeedBackLink.data)
        setprojectName(projectName)
        setlink(getfeedBackLink.data)
        setShowDialog(true);
    }

    async function handelGO() {
        // router.push("/feedback");
        router.push(`/feedback/${LinkData}`)
    }


    async function closeMsg() {
        setShowDialog(false);
    }

    function handleCopyCustomer() {
        const textArea = document.createElement("textarea");
        textArea.value = "http://localhost:3000/feedback/" + LinkData;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }
    function handleCopyStakeholder() {
        const textArea = document.createElement("textarea");
        textArea.value = "http://localhost:3000/feedbackSH/" + LinkData;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    return (
        // <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
        //     text
        //     {ProjectData != "" ? ProjectData.map((item, index) => ( 
        //         <div key={index} className="flex flex-col">
        //             <span>clientname :{item.clientname}</span>
        //             {
        //                 item.employees.map((emp,empindex) => (
        //                     emp.name == null ? 
        //                     <div key={empindex}>
        //                         <span>{emp[0]?.name ? emp[0].name : null}</span>
        //                     </div>
        //                     :
        //                     <div key={empindex}>
        //                         <span>{emp?.name ? emp.name : null}</span>
        //                     </div>
        //                 ))
        //             }
        //             <span>projectName :{item.projectName}</span>
        //             <button onClick={()=> handelProjectFinish(item.projectName)} className="rounded bg-gray-400">finish</button>
        //         </div>
        //     )) : null}
        //     <div>
        //         <span>Created Link : {LinkData}</span>
        //     </div>
        //     <button onClick={handelGO} className="rounded bg-gray-400" >go </button>
        // </main>
        // <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
        // <table>
        //     <thead>
        //         <tr>
        //             <th>Client Name</th>
        //             <th>Employee Name</th>
        //             <th>Project Name</th>
        //             <th>Actions</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {ProjectData !== "" ? ProjectData.map((item, index) => (
        //             <tr key={index}>
        //                 <td>{item.clientname}</td>
        //                 <td>
        //                     {item.employees.map((emp, empindex) => (
        //                         <div key={empindex}>
        //                             <span>{emp.name == null ? emp[0]?.name : emp.name}</span>
        //                         </div>
        //                     ))}
        //                 </td>
        //                 <td>{item.projectName}</td>
        //                 <td>
        //                     <button onClick={() => handelProjectFinish(item.projectName)} className="rounded bg-gray-400">Finish</button>
        //                 </td>
        //             </tr>
        //         )) : null}
        //     </tbody>
        // </table>
        // <div>
        //     <span>Created Link: {LinkData}</span>
        // </div>
        // <button onClick={handelGO} className="rounded bg-gray-400">Go</button>
        // </main>
        <main>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-b1">
                <div class="p-6 w-full rounded-2xl  px-0 bg-b2 shadow-2xl">
                    <table class="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70  font-bold">Project Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Client Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>

                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Status <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Actions</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProjectData !== "" ? ProjectData.map((item, index) => (
                                <tr key={index}>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <div class="flex flex-col">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.projectName}</p>
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Start date: {item.createdAt.substring(0, item.createdAt.indexOf('T'))}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.clientname}</p>
                                        </div>
                                    </td>
                                    {
                                        item.projectStatus == 0 ?
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <div class="w-max">
                                                    <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-b3 text-b1  py-1 px-2 text-xs rounded-md">
                                                        <span class="">On Going</span>
                                                    </div>
                                                </div>
                                            </td>
                                            :
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <div class="w-max">
                                                    <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-o1 text-b1  py-1 px-2 text-xs rounded-md">
                                                        <span class="">Completed</span>
                                                    </div>
                                                </div>
                                            </td>
                                    }

                                    {/* <td>
                                    {item.employees.map((emp, empindex) => (
                                        <div key={empindex}>
                                            <span>{emp.name == null ? emp[0]?.name : emp.name}</span>
                                        </div>
                                    ))}
                                </td> */}

                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button
                                            onClick={() => handelProjectFinish(item.projectName)}
                                            class=" bg-o1 text-b1 font-bold rounded p-2 " type="button">
                                            Finish
                                        </button>
                                    </td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                </div>
                {
                    showDialog &&
                    <div class="rounded fixed top-0 left-0 flex items-center justify-center w-full h-full z-10"
                        // onClick={closeMsg}
                        style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
                        x-show="open">
                        <div class=" h-auto p-4 mx-2 text-left bg-b2 rounded-3xl shadow-xl dark:bg-b2 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
                        >
                            <div class="flex justify-center mb-4">
                                <button
                                    onClick={closeMsg}
                                    class=" dark:text-o1 dark:hover:text-o1 hover:text-o1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-myOrange">
                                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mb-4 text-center">
                                <h2 class="text-2xl font-bold leading-snug text-o1 dark:text-gray-400">
                                    Project {projectName} was Completed
                                </h2>
                                <div class="mt-4 ">
                                    <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                                        This is Feedback Link For Customer
                                    </p>
                                    <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                                        {/* <u>http://localhost:3000/feedback/{LinkData}</u> */}
                                        <button className="bg-o1 text-b1 font-bold p-2 rounded"  onClick={handleCopyCustomer}>Copy Link</button>
                                    </p>
                                    <p class="text-mb leading-5 text-gray-500 dark:text-gray-400 mt-2">
                                        This is Feedback Link For Stakeholder
                                    </p>
                                    <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                                        <button className="bg-o1 text-b1 font-bold p-2 rounded"  onClick={handleCopyStakeholder}>Copy Link</button>
                                        {/* <u>http://localhost:3000/feedbackSH/{LinkData}</u> */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div >
                }
            </div>
        </main>
    );

}