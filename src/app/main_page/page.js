// "use client"

// import { useRouter } from "next/navigation";
// import Navbar from "../components/navBar";


// export default function MainPage() {
//     const router = useRouter();
//     return (
//         <main >
//             <Navbar />
//             <div className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-b1">
//                 <div className=" p-10  rounded w-full flex justify-center items-center gap-2 shadow-2xl bg-b2">
//                     <span className="text-o1 font-semibold text-2xl">Welcome to</span>
//                     <span className="text-o1 font-bold text-2xl">TRAJECT</span>
//                 </div>
//                 <div className=" p-10 shadow-2xl rounded w-full flex justify-center items-center gap-2 bg-b2">
//                     <section className="self-stretch rounded-sm bg-cornflowerblue-100 flex flex-row items-start justify-start pt-14 pb-[39px] pr-[43px] pl-[53px] box-border gap-[120px] max-w-full text-left text-mini text-black1 font-poppins lg:flex-wrap lg:pl-[26px] lg:pr-[21px] lg:box-border mq450:gap-[120px] mq750:gap-[120px] mq750:pt-9 mq750:pb-[25px] mq750:box-border">

//                         <div className="h-[637px] w-[1406px] relative rounded-sm bg-cornflowerblue-100 hidden max-w-full" />
//                         <div className="flex flex-col items-center justify-center w-full gap-16">
//                             <div className="flex flex-row items-center justify-center w-full gap-20 ">
//                                 <div className="bg-b1 cursor-pointer  border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex " onClick={() => router.push("/add_employee")}>
//                                     <div className=" z-[2] text-o1 font-bold">
//                                         Add Employees
//                                     </div>
//                                 </div>
//                                 <div className="bg-b1 cursor-pointer border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex" onClick={() => router.push("/create_project")}>
//                                     <div className="font-bold text-o1 z-[2] ">
//                                         Create Project
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="flex flex-row items-center justify-center w-full gap-20">
//                                 <div className="bg-b1 cursor-pointer border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex" onClick={() => router.push("/all_projects")}>
//                                     <div className="font-bold text-o1 z-[2]  ">
//                                         View Projects
//                                     </div>
//                                 </div>
//                                 <div className="bg-b1 cursor-pointer border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex " onClick={() => router.push("/all_employees")}>
//                                     <div className="font-bold text-o1 z-[2] ">
//                                         View Employees
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </main>
//     );
// }

"use client"

import { useRouter } from "next/navigation";
import Navbar from "../components/navBar";
import { FaUserPlus, FaUsers } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { MdWorkspaces } from "react-icons/md";

export default function MainPage() {
    const router = useRouter();
    return (
        <main>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-b1">
                <div className="p-10 rounded w-full flex justify-center items-center gap-2 shadow-2xl bg-b2">
                    <span className="text-o1 font-semibold text-2xl">Welcome to</span>
                    <span className="text-o1 font-bold text-2xl">TRAJECT</span>
                </div>
                <div className="p-10 shadow-2xl rounded w-full flex justify-center items-center gap-2 bg-b2">
                    <section className="self-stretch rounded-sm bg-cornflowerblue-100 flex flex-row items-start justify-start pt-14 pb-[39px] pr-[43px] pl-[53px] box-border gap-[120px] max-w-full text-left text-mini text-black1 font-poppins lg:flex-wrap lg:pl-[26px] lg:pr-[21px] lg:box-border mq450:gap-[120px] mq750:gap-[120px] mq750:pt-9 mq750:pb-[25px] mq750:box-border">
                        <div className="h-[637px] w-[1406px] relative rounded-sm bg-cornflowerblue-100 hidden max-w-full" />
                        <div className="flex flex-col items-center justify-center w-full gap-16">
                            <div className="flex flex-row items-center justify-center w-full gap-20 ">
                                <div className="bg-b1 cursor-pointer  border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex " onClick={() => router.push("/add_employee")}>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <FaUserPlus size={60} color="#f9b17a" />
                                        <div className="z-[2] text-o1 font-bold">
                                            Add Employees

                                        </div>
                                    </div>
                                </div>

                                <div className="bg-b1 cursor-pointer border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex" onClick={() => router.push("/create_project")}>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <FaTasks size={60} color="#f9b17a" />
                                        <div className="font-bold text-o1 z-[2] ">
                                            Create Project
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-center w-full gap-20">
                                <div className="bg-b1 cursor-pointer border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex" onClick={() => router.push("/all_projects")}>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <MdWorkspaces size={60} color="#f9b17a" />
                                        <div className="font-bold text-o1 z-[2]  ">
                                            View Projects
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-b1 cursor-pointer border border-o1 rounded-3xl h-[250px] w-[250px] justify-center items-center flex " onClick={() => router.push("/all_employees")}>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <FaUsers size={60} color="#f9b17a" />
                                        <div className="font-bold text-o1 z-[2] ">
                                            View Employees
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
