"use client"

import { getEmployeesData } from "@/services/employee";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar";

export default function AllEmp() {
    const [EmpData, setEmpData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmpData, setFilteredEmpData] = useState([]);

    async function handleEmpData() {
        const testVal = await getEmployeesData();
        console.log("🚀 ~ handleProjectsData ~ testVal:", testVal.data)
        return testVal.data
    }

    useEffect(() => {

        const fetchData = async () => {
            const data = await handleEmpData();
            setEmpData(data);
            setFilteredEmpData(data);
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        console.log("🚀 ~ handleSearch ~ searchTerm:", searchTerm)

        const filteredData = filteredEmpData.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("🚀 ~ handleSearch ~ filteredData:", filteredData)
        
        setEmpData(filteredData);
        
        
    };
            

    return (
        <main >
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-b1">
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-o1 text-b1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
                <div class="p-6 w-full rounded-2xl  px-0 bg-b2 shadow-2xl">
                    <table class="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70  font-bold">Employee Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Availability <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>

                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Hour Rate <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>

                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Project Count <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>

                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Quality Score<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>

                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Role<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Designation<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>

                                <th class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">Skills <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {EmpData !== "" ? EmpData.map((item, index) => (
                                <tr key={index}>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <div class="flex flex-col">
                                                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.Availability.toFixed(2)}</p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Rs. {item.hourRate}</p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            {/* <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.projectCount - 1}</p> */}
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.projectCount}</p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{Math.round(item.rateting)}%</p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.role}</p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{item.designation}</p>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                {item.skills.map((itemv, index) => (
                                                    <div key={index}>{itemv}</div>
                                                ))}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}