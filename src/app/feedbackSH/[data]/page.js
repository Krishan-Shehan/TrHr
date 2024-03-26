"use client"

import { updateEmpRateSH } from "@/services/employee";
import { handleProjectsDataById, updateProjectData, updateProjectRating, updateProjectRatingSH } from "@/services/project";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function FeedBackSH() {
    const [ProjectData, setProjectData] = useState("");
    const [ProjectEmployees, setProjectEmployees] = useState([]);
    const [rating1, setRating1] = useState(null);
    const [rating2, setRating2] = useState(null);
    const [rating3, setRating3] = useState(null);
    const [comment, setComment] = useState("");
    const [commetRate, setCommetRate] = useState(null)
    const params = useParams();

    const data = params["data"];
    console.log("🚀 ~ FeedBack ~ data:", data)

    async function handleProjectsData(data) {
        const testVal = await handleProjectsDataById(data);
        console.log("🚀 ~ handleProjectsData ~ testVal:", testVal.data)
        return testVal.data
    }

    useEffect(() => {

        const fetchData = async () => {
            const Projectdata = await handleProjectsData(data);

            const flattenedResult = Projectdata[0]?.employees.reduce((acc, val) => acc.concat(val), []);
            // console.log("🚀 ~ useEffect ~ flattenedResult:", flattenedResult)
            const uniqueValues = flattenedResult.reduce((acc, obj) => {
                const found = acc.some(item => item._id === obj._id);
                if (!found) {
                    acc.push(obj);
                }
                return acc;
            }, []);
            // console.log("🚀 ~ fetchData ~ uniqueValues:", uniqueValues)
            setProjectEmployees(uniqueValues);
            setProjectData(Projectdata);
        };

        fetchData();


    }, []);

    const handleRatingChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("🚀 ~ handleSubmit ~ data:", employeeRatings)
        let crate = [];

        for (const employeeName in employeeRatings) {
            if (Object.hasOwnProperty.call(employeeRatings, employeeName)) {
                const comment = employeeRatings[employeeName]; // Get the comment corresponding to the employee
                console.log("🚀 ~ handleSubmit ~ comment:", comment);

                const data = {
                    comment: comment
                };

                try {
                    const response = await fetch('http://localhost:8000/test', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const responseData = await response.json();
                    console.log("🚀 ~ handleSubmit ~ responseData:", responseData);
                    crate.push(responseData);
                    setCommetRate(responseData);
                    console.log("responseData responseData:", responseData);

                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            }
        }

        console.log("🚀 ~ handleSubmit ~ crate:", crate)

        const employeeData = ProjectEmployees.map((employee, index) => ({
            name: employee.name,
            // rate: Number(employeeRatings[index]) || 0 
            rate: Number(crate[index]) || 0
        }));


        console.log("employeeData", employeeData);

        for (let index = 0; index < employeeData.length; index++) {
            const element = employeeData[index];
            console.log("🚀 ~ handleSubmit ~ element:", element.rate)
            const res = await updateEmpRateSH(element.name, (element.rate) * 10, ProjectData[0].projectName);
            console.log("🚀 ~ handleSubmit ~ res:", res)
        }

        setShowDialog(true)
    };

    const [showDialog, setShowDialog] = useState(false)

    async function closeMsg() {
        setShowDialog(false);
    }

    const [updatedEmployeeArray, setUpdatedEmployeeArray] = useState([]);

    const [employeeRatings, setEmployeeRatings] = useState([]);


    const handleEmployeeRatingChange = (event, employeeName) => {
        const { value } = event.target;
        setEmployeeRatings(prevRatings => ({
            ...prevRatings,
            [employeeName]: value
        }));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-b1">
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
                                Thank you for yor FeedBack
                            </h2>
                        </div>
                    </div>
                </div >
            }
            <div className="flex flex-col gap-4 bg-b2 rounded-2xl p-2 border border-o1 justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                    <span className="text-black font-bold text-xl">Project : {ProjectData[0]?.projectName}</span>
                    <span className="w-25">Your thoughts and feedbacks are key to our growth! Share your thoughts below.</span>
                </div>
                <hr className="w-full h-1" />
                {
                    ProjectEmployees.map((obj, index) => (
                        <div key={index} className="flex flex-row">
                            <span className="p-2 w-20">{obj.name}</span>
                            <textarea
                                className="rounded-2xl bg-b3 p-2"
                                onChange={(event) => handleEmployeeRatingChange(event, obj.name)}
                                name={`feedbackComment-${obj.name}`} rows="3" cols="50"></textarea>
                        </div>
                    ))
                }

                <button onClick={handleSubmit} className="rounded bg-o1 font-bold text-b1 p-2 ">Submit</button>

            </div>
        </main>
    );

}