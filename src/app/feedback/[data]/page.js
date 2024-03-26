"use client"

import { handleProjectsDataById, updateProjectData, updateProjectRating } from "@/services/project";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function FeedBack() {
    const [ProjectData, setProjectData] = useState("");
    const [rating1, setRating1] = useState(null);
    const [rating2, setRating2] = useState(null);
    const [rating3, setRating3] = useState(null);
    const [comment, setComment] = useState("");
    const [commetRate, setCommetRate] = useState(null)
    const params = useParams();
    const [showDialog, setShowDialog] = useState(false)

    const dataval = params["data"];
    console.log("🚀 ~ FeedBack ~ data:", dataval)

    async function handleProjectsData(dataneed) {
        const testVal = await handleProjectsDataById(dataneed);
        console.log("🚀 ~ handleProjectsData ~ testVal:", testVal.data)
        return testVal.data
    }

    useEffect(() => {

        const fetchData = async () => {
            const Projectdata = await handleProjectsData(dataval);
            setProjectData(Projectdata);
        };

        fetchData();
    }, []);

    const handleRatingChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSubmit = async (event) => {
        console.log("🚀 ~ handleSubmit ~ data:", "data")
        event.preventDefault();

        const datacm = {
            comment: comment
        };
        console.log("🚀 ~ handleSubmit ~ data:", datacm)
        let crate;
        try {
            const response = await fetch('http://localhost:8000/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datacm)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            crate = responseData
            setCommetRate(responseData);
            console.log("responseData responseData:", responseData);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

        console.log("🚀 ~ handleSubmit ~ commetRate:", crate)
        console.log("🚀 ~ handleSubmit ~ rating3:", rating3)
        console.log("🚀 ~ handleSubmit ~ rating2:", rating2)
        console.log("🚀 ~ handleSubmit ~ rating1:", rating1)

        const finalRating = (Number(crate) + Number(rating1) + Number(rating2) + Number(rating3)) * 5 / 2

        console.log("🚀 ~ handleSubmit ~ finalRating:", finalRating)

        const upres = await updateProjectRating(finalRating, ProjectData[0].projectName);
        console.log("🚀 ~ handleSubmit ~ upres:", upres)

        setShowDialog(true)
    };

    async function closeMsg() {
        setShowDialog(false);
    }

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
            <div className="flex flex-col gap-4 bg-b2 shadow-2xl rounded-2xl p-2 border border-o1 justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                    <span className="text-black font-bold text-xl">Project : {ProjectData[0]?.projectName}</span>
                    <span className="w-25">Your thoughts and feedbacks are key to our growth! Share your thoughts below.</span>
                </div>
                <hr className="w-full h-1" />
                <div className="flex flex-col justify-start w-full">
                    <label className="text-o1" htmlFor="feedbackComment">Feedback Comment:</label>
                    <textarea
                        className="rounded-2xl p-2 bg-b3"
                        onChange={(e) => {
                            setComment(e.target.value)
                        }} id="feedbackComment" name="feedbackComment" rows="4" cols="50"></textarea>
                </div>
                <div className="flex flex-col justify-start items-start w-full rounded-2xl border border-white p-2">
                    <label className="text-o1">{"How would you assess our team's communication effectiveness?"}</label>
                    <div className="pl-2 flex gap-2">
                        {[...Array(5)].map((_, index) => {
                            let ratingDescription = '';
                            switch (index + 1) {
                                case 1:
                                    ratingDescription = 'Unsatisfactory';
                                    break;
                                case 2:
                                    ratingDescription = 'Below average';
                                    break;
                                case 3:
                                    ratingDescription = 'Average';
                                    break;
                                case 4:
                                    ratingDescription = 'Above average';
                                    break;
                                case 5:
                                    ratingDescription = 'Satisfied';
                                    break;
                                default:
                                    ratingDescription = '';
                            }
                            return (
                                <label key={index} className="pl-2 flex gap-2">
                                    <input type="radio" name="rating1" value={index + 1} onChange={(e) => handleRatingChange(e, setRating1)} />
                                    <span>{ratingDescription}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start w-full rounded-2xl border border-white p-2">
                    <label className="text-o1">{"How satisfied are you with the quality of the project delivered?"}</label>
                    <div className="pl-2 flex gap-2">
                        {[...Array(5)].map((_, index) => {
                            let ratingDescription = '';
                            switch (index + 1) {
                                case 1:
                                    ratingDescription = 'Unsatisfactory';
                                    break;
                                case 2:
                                    ratingDescription = 'Below average';
                                    break;
                                case 3:
                                    ratingDescription = 'Average';
                                    break;
                                case 4:
                                    ratingDescription = 'Above average';
                                    break;
                                case 5:
                                    ratingDescription = 'Satisfied';
                                    break;
                                default:
                                    ratingDescription = '';
                            }
                            return (
                                <label key={index} className="pl-2 flex gap-2">
                                    <input type="radio" name="rating2" value={index + 1} onChange={(e) => handleRatingChange(e, setRating2)} />
                                    <span>{ratingDescription}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start w-full rounded-2xl border border-white p-2">
                    <label className="text-o1">{"How do you evaluate the timeliness of the project's completion?"}</label>
                    <div className="pl-2 flex gap-2">
                        {[...Array(5)].map((_, index) => {
                            let ratingDescription = '';
                            switch (index + 1) {
                                case 1:
                                    ratingDescription = 'Unsatisfactory';
                                    break;
                                case 2:
                                    ratingDescription = 'Below average';
                                    break;
                                case 3:
                                    ratingDescription = 'Average';
                                    break;
                                case 4:
                                    ratingDescription = 'Above average';
                                    break;
                                case 5:
                                    ratingDescription = 'Satisfied';
                                    break;
                                default:
                                    ratingDescription = '';
                            }
                            return (
                                <label key={index} className="pl-2 flex gap-2">
                                    <input type="radio" name="rating3" value={index + 1} onChange={(e) => handleRatingChange(e, setRating3)} />
                                    <span>{ratingDescription}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <button onClick={handleSubmit} className="rounded bg-o1 font-bold text-b1 p-2 ">Submit</button>

                {/* <div>
                <h2>{ProjectData[0]?.projectName}</h2>
            </div>
            
            <div>
                <label htmlFor="rating1">Rating 1:</label>
                <select id="rating1" name="rating1">
                    {[...Array(5)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="rating2">Rating 2:</label>
                <select id="rating2" name="rating2">
                    {[...Array(5)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="rating3">Rating 3:</label>
                <select id="rating3" name="rating3">
                    {[...Array(5)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="rating1">Rating 1:</label>
                <input type="range" id="rating1" name="rating1" min="1" max="5" defaultValue="3" />
            </div>
            <div>
                <label>Rating 3:</label>
                {[...Array(5)].map((_, index) => (
                    <label key={index}>
                        <input type="radio" name="rating3" value={index + 1} />
                        {index + 1}
                    </label>
                ))}
            </div> */}
                {/* <div>
                <label htmlFor="rating1">Rating 1:</label>
                <input type="range" id="rating1" name="rating1" min="1" max="5" defaultValue="3" onChange={(e) => setRating1Value(e.target.value)} />
                <span>{rating1Value}</span>
            </div> */}
            </div>
        </main>
    );

}