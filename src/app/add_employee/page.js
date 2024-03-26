"use client"

import { AddEmployeeData } from "@/services/employee";
import { useState } from "react";
import Navbar from "../components/navBar";

const skillsData = {
    "Programming Languages": ["Python", "JavaScript", "Java", "C#", "Ruby", "Go", "TypeScript", "Kotlin", "Swift"],
    "Development Frameworks and Libraries": ["React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Spring Boot", "Flask"],
    "Cloud Platforms and Services": ["AWS", "Azure", "Google Cloud Platform", "Heroku", "DigitalOcean", "Firebase", "IBM Cloud"],
    "Continuous Integration/Continuous Deployment (CI/CD) Tools": ["Jenkins", "Travis CI", "CircleCI", "GitLab CI", "GitHub Actions", "Bamboo", "TeamCity"],
    "Testing Tools": ["Jest", "Mocha", "Selenium", "Cypress", "JUnit", "TestNG", "Pytest", "RSpec"],
    "Security Tools": ["OWASP ZAP", "Nmap", "Wireshark", "Burp Suite", "Metasploit", "Snort", "Acunetix", "Qualys"]
};


export default function AddEmployee() {
    const [formdata, setFormdata] = useState({
        name: "",
        role: "",
        skills: [],
        hourRate: "",
        designation: ""
    });

    const handleSkillChange = (skill) => {
        const updatedSkills = formdata.skills.includes(skill)
            ? formdata.skills.filter(s => s !== skill)
            : [...formdata.skills, skill];

        setFormdata({
            ...formdata,
            skills: updatedSkills
        });
    };

    // const handleSkillChange = (skill) => {
    //     const updatedSkills = formdata.skills.includes(skill)
    //         ? formdata.skills.filter(s => s !== skill)
    //         : [...formdata.skills, skill];

    //     setFormdata({
    //         ...formdata,
    //         skills: updatedSkills
    //     });
    // };

    async function handelEmpAdd() {
        console.log("🚀 ~ AddEmployee ~ formdata:", formdata)
        const res = await AddEmployeeData(formdata)
        console.log("🚀 ~ handelEmpAdd ~ res:", res)
    }

    const [showCategories, setShowCategories] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategoryToggle = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    const handleCategorySelect = (category) => {
        setShowCategories(false);
        setSelectedCategory(category);
    };

    const handleSkillSelect = (skill) => {
        handleSkillChange(skill);
        // setShowCategories(false);
    };

    const toggleCategory = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
        }
    };

    return (
        <main className="bg-b1 ">
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-24 bg-b1 ">
                <div className="bg-b2 flex flex-col gap-4 p-5 rounded shadow-2xl">
                    <div className="flex flex-row gap-2 p-2">
                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Name</span>
                            <input className="bg-b3 p-2 rounded" onChange={(event) => {
                                setFormdata({
                                    ...formdata,
                                    name: event.target.value,
                                });

                            }} />
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Designations</span>
                            <select
                                className="bg-b3 p-2 rounded"
                                value={formdata.designation}
                                name="role"
                                onChange={
                                    (event) => {
                                        setFormdata({
                                            ...formdata,
                                            designation: event.target.value,
                                        });
                                    }
                                }
                                required
                            >
                                <option value="">Select Designation</option>
                                {/* Replace this array with your actual list of skills */}
                                {["Intern", "Associate", "Senior", "Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"].map((skillName) => (
                                    <option key={skillName} value={skillName}>
                                        {skillName}
                                    </option>
                                ))}
                            </select>
                            {/* <input className="bg-b3 p-2 rounded" onChange={(event) => {
                                setFormdata({
                                    ...formdata,
                                    role: event.target.value,
                                });

                            }} /> */}
                        </div>

                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Hour Rate (Rs)</span>
                            <input className="bg-b3 p-2 rounded" onChange={(event) => {
                                setFormdata({
                                    ...formdata,
                                    hourRate: event.target.value,
                                });

                            }} />

                        </div>

                    </div>
                    {/* <div className="flex flex-col gap-2 w-1/3">
                        <span className="text-o1 font-bold">Employee skills</span>
                        {["skill1", "skill2", "skill3"].map((skillName) => (
                            <label key={skillName} className="mr-2 bg-b3 p-2 rounded">
                                <input
                                    className="bg-o1 p-2 rounded"
                                    type="checkbox"
                                    value={skillName}
                                    checked={formdata.skills.includes(skillName)}
                                    onChange={() => handleSkillChange(skillName)}
                                />
                                <span className="p-4">{skillName}</span>

                            </label>
                        ))}
                    </div> */}
                    {/* <div className="flex flex-col gap-2 w-1/3">
                        <span className="text-o1 font-bold">Employee skills</span>
                        {Object.entries(skillsData).map(([category, skills]) => (
                            <div key={category} className="flex flex-col gap-2">
                                <span className="text-o1 font-bold">{category}</span>
                                <select
                                    className="bg-b3 p-2 rounded"
                                    multiple
                                    value={formdata.skills.filter(skill => skills.includes(skill))}
                                    onChange={(event) => {
                                        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                                        const updatedSkills = formdata.skills.filter(skill => !skills.includes(skill)).concat(selectedOptions);
                                        setFormdata({
                                            ...formdata,
                                            skills: updatedSkills
                                        });
                                    }}
                                >
                                    {skills.map((skillName) => (
                                        <option key={skillName} value={skillName}>
                                            {skillName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div> */}
                    {/* <div className="flex flex-col gap-2 w-1/3">
                        {Object.entries(skillsData).map(([category, skills]) => (
                            <div key={category} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-o1 font-bold">{category}</span>
                                    <button className="p-1 bg-gray-300 rounded" onClick={(event) => event.preventDefault()}>
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="ml-4">
                                    {skills.map((skillName) => (
                                        <label key={skillName} className="flex items-center gap-2">
                                            <input
                                                className="bg-o1 rounded"
                                                type="checkbox"
                                                value={skillName}
                                                checked={formdata.skills.includes(skillName)}
                                                onChange={() => handleSkillChange(skillName)}
                                            />
                                            <span>{skillName}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div> */}
                    {/* <div className="flex flex-col gap-2 w-1/3">
                        {Object.entries(skillsData).map(([category, skills]) => (
                            <div key={category} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleCategory(category)}>
                                    <span className="text-o1 font-bold">{category}</span>
                                    <button className="p-1 bg-gray-300 rounded">
                                        {expandedCategory === category ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {expandedCategory === category && (
                                    <div className="ml-4">
                                        {skills.map((skillName) => (
                                            <label key={skillName} className="flex items-center gap-2">
                                                <input
                                                    className="bg-o1 rounded"
                                                    type="checkbox"
                                                    value={skillName}
                                                    checked={formdata.skills.includes(skillName)}
                                                    onChange={() => handleSkillChange(skillName)}
                                                />
                                                <span>{skillName}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div> */}
                    <div className="flex flex-row gap-2 p-2">
                        <div className="flex flex-col gap-2 w-1/3 p-2">
                            <span className="text-o1 font-bold">Select Skills</span>
                            <div className="relative">
                                <button className="bg-b3 p-2 rounded"
                                    onClick={() => setShowCategories(!showCategories)}>

                                    Select skills
                                </button>
                                {/* <input
                                className="bg-b3 p-2 rounded"
                                placeholder="Select skills"
                                onClick={() => setShowCategories(!showCategories)}
                                readOnly
                            /> */}
                                {showCategories && (
                                    <div className=" top-full left-0 bg-b2 rounded shadow-md w-full z-10">
                                        {Object.entries(skillsData).map(([category, skills]) => (
                                            <div key={category} className="border-t border-gray-300">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer px-4 py-2"
                                                    onClick={() => handleCategoryToggle(category)}
                                                >
                                                    <span className="text-o1 font-bold">{category}</span>
                                                    {/* <svg
                                                    className="h-5 w-5 transform transition-transform"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    style={{ transform: selectedCategory === category ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                > */}
                                                    <svg
                                                        className="h-5 w-5 transform transition-transform"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        style={{ transform: category === selectedCategory ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                    ></svg>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    {/* </svg> */}
                                                </div>
                                                {selectedCategory === category && (
                                                    <div className="ml-4">
                                                        {skills.map((skillName) => (
                                                            <label key={skillName} className="flex items-center gap-2">
                                                                <input
                                                                    className="bg-o1 rounded"
                                                                    type="checkbox"
                                                                    value={skillName}
                                                                    checked={formdata.skills.includes(skillName)}
                                                                    onChange={() => handleSkillSelect(skillName)}
                                                                />
                                                                <span>{skillName}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Role</span>
                            <select
                                className="bg-b3 p-2 rounded"
                                value={formdata.role}
                                name="role"
                                onChange={
                                    (event) => {
                                        setFormdata({
                                            ...formdata,
                                            role: event.target.value,
                                        });
                                    }
                                }
                                required
                            >
                                <option value="">Select Role</option>
                                {/* Replace this array with your actual list of skills */}
                                {["Software Developer",
                                    "Business Analyst",
                                    "UI Designer",
                                    "DevOps Engineer",
                                    "Quality Assurance",
                                    "Software Architect",
                                    "Quality engineer"
                                ].map((skillName) => (
                                    <option key={skillName} value={skillName}>
                                        {skillName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={handelEmpAdd} className="bg-o1 font-bold text-b1">Add Employee</button>
                </div>
            </div>
        </main>
    );
}