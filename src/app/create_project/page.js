"use client"

import { addProject, getEmp, getEmpBySkill, testApi, updateEmpAv } from "@/services/employee";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const skillsData = {
  "Programming Languages": ["Python", "JavaScript", "Java", "C#", "Ruby", "Go", "TypeScript", "Kotlin", "Swift"],
  "Development Frameworks and Libraries": ["React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Spring Boot", "Flask"],
  "Cloud Platforms and Services": ["AWS", "Azure", "Google Cloud Platform", "Heroku", "DigitalOcean", "Firebase", "IBM Cloud"],
  "Continuous Integration/Continuous Deployment (CI/CD) Tools": ["Jenkins", "Travis CI", "CircleCI", "GitLab CI", "GitHub Actions", "Bamboo", "TeamCity"],
  "Testing Tools": ["Jest", "Mocha", "Selenium", "Cypress", "JUnit", "TestNG", "Pytest", "RSpec"],
  "Security Tools": ["OWASP ZAP", "Nmap", "Wireshark", "Burp Suite", "Metasploit", "Snort", "Acunetix", "Qualys"]
};


export default function CreateProject() {

  const router = useRouter();
  const [formData, setFormData] = useState({
    skills: [{ skill: "", percentage: "" }],
  });

  const [bestData, setbestData] = useState("");
  const [avgData, setavgData] = useState("");
  const [costData, setcostData] = useState("");
  const [empAvilable, setempAvilable] = useState(false);
  const [shiowAvilable, setshiowAvilable] = useState(false);
  const [SelectedEmp, setSelectedEmp] = useState([[]]);
  const [showMid, setShowMid] = useState(false);
  const [showBestEdit, setShowBestEdit] = useState(false);
  const [showAVGEdit, setShowAVGEdit] = useState(false);
  const [showCostEdit, setShowCostEdit] = useState(false);
  const [empeditdata, setempeditdata] = useState("");
  const [pexVal, setpexVal] = useState(0);

  // Function to handle changes in the skills and percentage fields


  // Function to add new skill and percentage fields

  const addSkill = () => {
    if (pexVal != 100) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { skill: "", percentage: "" }],
      });
    }
  };

  // Function to remove a skill and percentage fields
  const removeSkill = (index) => {
    const skills = [...formData.skills];
    console.log("🚀 ~ removeSkill ~ formData len:", formData.skills.length)
    skills.splice(index, 1);
    setFormData({ ...formData, skills });
    let pval = 0;
    console.log("🚀 ~ removeSkill ~ formData len 2:", formData.skills.length)

    setpexVal(pexVal - formData.skills[formData.skills.length - 1].percentage)

  };

  async function handleForm() {
    event.preventDefault();

    // console.log("🚀 ~ HrCommunication ~ formData:", formData)
    console.log("🚀 ~ handleForm ~ formData:", formData)
    const res = await testApi(formData);

    console.log("🚀 ~ handleForm ~ res:", res)

    const bestVal = res.best
    const avgVal = res.avg
    const costVal = res.cost

    setbestData(bestVal);
    setavgData(avgVal);
    setcostData(costVal);
    setShowMid(true)
  }

  async function handleBestSelect() {
    console.log(formData.clientName)
    console.log(formData.projectName)
    // console.log(formData.estimatedCost)
    console.log(typeof (bestData))
    const res = await addProject(formData.clientName, formData.projectName, bestData, bestData)
    console.log("🚀 ~ handleBestSelect ~ res:", res)
    const upres = await updateEmpAv(bestData, formData.skills, formData.manHr)
    console.log("🚀 ~ handleBestSelect ~ upres:", upres)
    // router.push("/main_page")
  }

  async function handleAVGSelect() {
    console.log(formData.clientName)
    console.log(formData.projectName)
    // console.log(formData.estimatedCost)
    console.log(typeof (avgData))
    const res = await addProject(formData.clientName, formData.projectName, avgData, avgData)
    console.log("🚀 ~ handleBestSelect ~ res:", res)
    const upres = await updateEmpAv(avgData, formData.skills, formData.manHr)
    console.log("🚀 ~ handleBestSelect ~ upres:", upres)
    router.push("/main_page")
  }

  async function handleCostSelect() {
    console.log(formData.clientName)
    console.log(formData.projectName)
    // console.log(formData.estimatedCost)
    console.log(typeof (costData))
    const res = await addProject(formData.clientName, formData.projectName, costData, costData)
    console.log("🚀 ~ handleBestSelect ~ res:", res)
    const upres = await updateEmpAv(costData, formData.skills, formData.manHr)
    console.log("🚀 ~ handleBestSelect ~ upres:", upres)
    router.push("/main_page")
  }

  async function handelFind() {

    setempAvilable(false)
    setshiowAvilable(false)
    console.log(formData.empName);
    console.log(formData.empRole);
    console.log(formData.empSkill);
    const res = await getEmp(formData.empName, formData.empRole, formData.empSkill)
    console.log("🚀 ~ handelFind ~ res:", res)
    if (res.empdata.length != 0) {
      console.log("ffff")
      setempAvilable(true)
      // setSelectedEmp(prevSelectedEmp => [...prevSelectedEmp, res.empdata[0].name, formData.empSkill]);
      setSelectedEmp(prevSelectedEmp => [...prevSelectedEmp, [res.empdata[0].name, formData.empSkill]]);
      // setSelectedEmp([res.empdata[0].name, formData.empSkill])
      console.log(res.empdata[0].name)
    }
    setshiowAvilable(true)

  }

  async function addEmpToform() {
    console.log("🚀 ~ addEmpToform ~ SelectedEmp:", SelectedEmp)
    setFormData({
      ...formData,
      selectedEmp: SelectedEmp,
    });
    console.log("🚀 ~ addEmpToform ~ formData:", formData)
    toast.success("Emp Added");
    setempAvilable(false)
    setshiowAvilable(false)
  }

  const handleStartDateChange = date => {
    setFormData({
      ...formData,
      startDate: date,
    });
  };

  const handleEndDateChange = date => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  async function goback() {
    setShowMid(false)
  }

  async function handleBestEdit() {
    console.log("🚀 ~ handleBestEdit ~ skill:", formData.skills[0]?.skill)

    const res = await getEmpBySkill(formData.skills)
    console.log("🚀 ~ handleBestEdit ~ res:", res)

    setempeditdata(res.empdata)
    setShowAVGEdit(false)
    setShowAVGEdit(false)
    setShowBestEdit(!showBestEdit)
  }

  async function handleAVGEdit() {
    console.log("🚀 ~ handleAVGEdit ~ skill:", formData.skills[0]?.skill)

    const res = await getEmpBySkill(formData.skills)
    console.log("🚀 ~ handleAVGEdit ~ res:", res)

    setempeditdata(res.empdata)
    setShowBestEdit(false)
    setShowCostEdit(false)
    setShowAVGEdit(!showAVGEdit)
  }

  async function handleCostEdit() {
    console.log("🚀 ~ handleCostEdit ~ skill:", formData.skills[0]?.skill)

    const res = await getEmpBySkill(formData.skills)
    console.log("🚀 ~ handleCostEdit ~ res:", res)

    setempeditdata(res.empdata)
    setShowBestEdit(false)
    setShowAVGEdit(false)
    setShowCostEdit(!showCostEdit)
  }

  async function handleSelection() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedValuesCK = Array.from(checkboxes).map(checkbox => checkbox.value);

    const groupedSelectedValues = {};

    selectedValuesCK.forEach(value => {
      const [outerIndex, innerIndex] = value.split(',');
      if (!groupedSelectedValues[outerIndex]) {
        groupedSelectedValues[outerIndex] = [];
      }
      groupedSelectedValues[outerIndex].push(empeditdata[outerIndex][innerIndex]);
    });

    console.log("🚀 ~ handleSelection ~ groupedSelectedValues:", groupedSelectedValues);
    const resultArray = Object.values(groupedSelectedValues);

    console.log("🚀 ~ handleSelection ~ resultArray:", resultArray);
    const res = await addProject(formData.clientName, formData.projectName, resultArray, resultArray)
    const upres = await updateEmpAv(resultArray, formData.skills, formData.manHr)
    router.push("/main_page")
  }

  async function handelradio(x, y) {
    console.log("🚀 ~ handelradio ~ y:", y)
    console.log("🚀 ~ handelradio ~ x:", x)
    console.log("🚀 ~ handelradio ~ x:", empeditdata[x][y])

  }

  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSubSkill, setSelectedSubSkill] = useState("");

  const skills = [
    { name: "skill1", subSkills: ["subSkill1", "subSkill2", "subSkill3"] },
    { name: "skill2", subSkills: ["subSkill4", "subSkill5", "subSkill6"] },
    { name: "skill3", subSkills: ["subSkill7", "subSkill8", "subSkill9"] }
  ];

  const handleSubSkillChange = (event) => {
    setSelectedSkill(event.target.value);
    setSelectedSubSkill("");
    // setSelectedSubSkill(event.target.value);
  };

  const handleSkillChange = (index, event) => {
    const { name, value } = event.target;
    const skills = [...formData.skills];
    skills[index][name] = value;
    setFormData({ ...formData, skills });

    let pval = 0;

    for (let index = 0; index < formData.skills.length; index++) {
      const element = formData.skills[index].percentage;
      console.log("🚀 ~ handleSkillChange ~ element:", element)
      pval = Number(pval) + Number(element)
      console.log("🚀 ~ handleSkillChange ~ pval:", pval)
      setpexVal(pval)
    }
    // setShowCategories(!showCategories)
  };

  const [showCategories, setShowCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCategory2, setSelectedCategory2] = useState(null)

  const handleCategoryToggle = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleCategoryToggle3 = (category) => {
    if (selectedCategory2 === category) {
      setSelectedCategory2(null);
    } else {
      setSelectedCategory2(category);
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

  const [showCategories1, setShowCategories1] = useState(Array(skills.length).fill(false));

  const handleCategoryToggle1 = (index) => {
    const updatedShowCategories = [...showCategories1];
    updatedShowCategories[index] = !updatedShowCategories[index];

    setShowCategories(updatedShowCategories);
  };

  const [showCategories2, setShowCategories2] = useState(false);
  const handleCategoryToggle2 = (index) => {
    const updatedShowCategories2 = [...showCategories1];
    updatedShowCategories2[index] = !updatedShowCategories2[index];

    setShowCategories2(updatedShowCategories2);
  };

  return (
    <main >
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-b1">
        {
          showMid ?
            <div className="bg-b2 shadow-xl w-1/2 p-2 rounded-2xl">
              <span onClick={goback} className="text-o1 font-bold cursor-pointer ">{"<-- Back"}</span>
              <div className="flex flex-col justify-center items-center gap-8 w-full">

                <div className="p-2 w-full bg-b3 rounded-2xl flex flex-col gap-2">
                  <span className="flex justify-center text-o1 font-bold"><u>Premier Prediction</u></span>

                  <div className="flex flex-row gap-2 justify-evenly">
                    {bestData != "" ? bestData.map((item, index) => (
                      item.name == null ?
                        <div key={item[0]._id}>
                          <div className="flex flex-col">
                            {formData.skills[index] ?
                              <span>Skill : {formData.skills[index]?.skill}</span>
                              :
                              null
                            }

                          </div>
                          <div className="flex flex-col">
                            <div>
                              <span>{item[0]?.name}</span>
                              {/* <span> - {item[0]?.rateting}</span> */}
                              <span> - {Number(item[0]?.rateting) == 0 ? Number(item[0]?.rateting) : Math.round(Number(item[0]?.rateting))}%</span>
                            </div>
                            {
                              item[1] &&
                              <div>
                                <span>{item[1]?.name}</span>
                                <span> - {Number(item[1]?.rateting) == 0 ? Number(item[1]?.rateting) : Math.round(Number(item[1]?.rateting))}%</span>
                              </div>
                            }
                            {
                              item[2] &&
                              <div>
                                <span>{item[2]?.name}</span>
                                <span> - {Number(item[2]?.rateting) == 0 ? Number(item[2]?.rateting) : Math.round(Number(item[2]?.rateting))}%</span>
                              </div>
                            }

                          </div>
                        </div>
                        :
                        <div key={item._id}>
                          <div className="flex flex-col">
                            <span>Skill :{formData.skills[index]?.skill}</span>
                          </div>
                          {item.name}h
                          {item?.rateting}h
                        </div>

                    )) : null}
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <button onClick={handleBestSelect} className="p-1 bg-o1 font-bold text-b1 rounded">Select</button>
                    <button onClick={handleBestEdit} className="p-1  rounded bg-o1 font-bold text-b1 ">Edit</button>
                  </div>
                </div>
                {
                  showBestEdit &&
                  <div className="flex justify-center items-center gap-2  ">
                    <div className="flex flex-row gap-10">

                      {empeditdata.map((innerArray, outerIndex) => (
                        <div key={outerIndex} className="border border-o1 flex flex-col p-2 gap-2 rounded ">
                          <div className="flex items-center justify-center">
                            <span className="text-o1 font-bold ">{formData.skills[outerIndex]?.skill}</span>
                          </div>

                          {innerArray.map((item, innerIndex) => (
                            <div key={innerIndex} >
                              <div className="flex flex-row gap-1">
                                <input
                                  type="checkbox"
                                  id={`checkbox_${outerIndex}_${innerIndex}`}
                                  name={`checkbox_${outerIndex}`}
                                  // checked={bestData.some(itemb => itemb.some(subItem => subItem.name === item.name))}
                                  value={[outerIndex, innerIndex]}
                                // value={item.name}
                                />
                                <label htmlFor={`checkbox_${outerIndex}_${innerIndex}`}>{item.name}</label>
                                <span> - {Math.round(Number(item?.rateting))}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}


                    </div>
                    <button className="h-10 p-1  rounded bg-o1 font-bold text-b1 " onClick={handleSelection}>Select</button>
                  </div>

                }
                <div className="p-2 w-full bg-b3 rounded-2xl flex flex-col gap-2">
                  <span className="flex justify-center text-o1 font-bold"><u>Standard Prediction</u></span>

                  <div className="flex flex-row gap-2 justify-evenly ">
                    {avgData != "" ? avgData.map((item, index) => (
                      item.name == null ?
                        <div key={item[0]._id}>
                          <div className="flex flex-col">
                            {formData.skills[index] ?
                              <span>Skill : {formData.skills[index]?.skill}</span>
                              :
                              null
                            }

                          </div>
                          <div className="flex flex-col">
                            <div>
                              <span>{item[0]?.name}</span>
                              {/* <span> - {item[0]?.rateting}</span> */}
                              <span> - {Number(item[0]?.rateting) == 0 ? Number(item[0]?.rateting) : Math.round(Number(item[0]?.rateting))}%</span>
                            </div>
                            {
                              item[1] &&
                              <div>
                                <span>{item[1]?.name}</span>
                                <span> - {Number(item[1]?.rateting) == 0 ? Number(item[1]?.rateting) : Math.round(Number(item[1]?.rateting))}%</span>
                              </div>
                            }
                            {
                              item[2] &&
                              <div>
                                <span>{item[2]?.name}</span>
                                <span> - {Number(item[2]?.rateting) == 0 ? Number(item[2]?.rateting) : Math.round(Number(item[2]?.rateting))}%</span>
                              </div>
                            }

                          </div>
                        </div>
                        :
                        <div key={item._id}>
                          <div className="flex flex-col">
                            <span>Skill :{formData.skills[index]?.skill}</span>
                          </div>
                          {item.name}h
                          {item?.rateting}h
                        </div>

                    )) : null}
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <button onClick={handleAVGSelect} className="p-1 bg-o1 font-bold text-b1 rounded">Select</button>
                    <button onClick={handleAVGEdit} className="p-1 bg-o1 font-bold text-b1 rounded">Edit</button>
                  </div>
                </div>

                {
                  showAVGEdit &&
                  <div className="flex justify-center items-center gap-2  ">
                    <div className="flex flex-row gap-2">

                      {empeditdata.map((innerArray, outerIndex) => (
                        <div key={outerIndex} className="border border-o1 flex flex-col p-2 gap-2 rounded ">
                          <div className="flex items-center justify-center">
                            <span className="text-o1 font-bold ">{formData.skills[outerIndex]?.skill}</span>
                          </div>

                          {innerArray.map((item, innerIndex) => (
                            <div key={innerIndex} >
                              <div className="flex flex-row gap-1">
                                <input
                                  type="checkbox"
                                  id={`checkbox_${outerIndex}_${innerIndex}`}
                                  name={`checkbox_${outerIndex}`}
                                  // checked={bestData.some(itemb => itemb.some(subItem => subItem.name === item.name))}
                                  value={[outerIndex, innerIndex]}
                                // value={item.name}
                                />
                                <label htmlFor={`checkbox_${outerIndex}_${innerIndex}`}>{item.name}</label>
                                <span> - {Math.round(Number(item?.rateting))}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}


                    </div>

                    <button className="h-10 p-1  rounded bg-o1 font-bold text-b1 " onClick={handleSelection}>Select</button>
                  </div>

                }

                <div className="p-2 w-full bg-b3 rounded-2xl flex flex-col gap-2">
                  <span className="flex justify-center text-o1 font-bold"><u>Economy Smart</u></span>

                  <div className="flex flex-row gap-2 justify-evenly ">
                    {costData != "" ? costData.map((item, index) => (
                      item.name == null ?
                        <div key={item[0]._id}>
                          <div className="flex flex-col">
                            {formData.skills[index] ?
                              <span>Skill : {formData.skills[index]?.skill}</span>
                              :
                              null
                            }

                          </div>
                          <div className="flex flex-col">
                            <div>
                              <span>{item[0]?.name}</span>
                              {/* <span> - {item[0]?.rateting}</span> */}
                              <span> - {Number(item[0]?.rateting) == 0 ? Number(item[0]?.rateting) : Math.round(Number(item[0]?.rateting))}%</span>
                            </div>
                            {
                              item[1] &&
                              <div>
                                <span>{item[1]?.name}</span>
                                <span> - {Number(item[1]?.rateting) == 0 ? Number(item[1]?.rateting) : Math.round(Number(item[1]?.rateting))}%</span>
                              </div>
                            }
                            {
                              item[2] &&
                              <div>
                                <span>{item[2]?.name}</span>
                                <span> - {Number(item[2]?.rateting) == 0 ? Number(item[2]?.rateting) : Math.round(Number(item[2]?.rateting))}%</span>
                              </div>
                            }

                          </div>
                        </div>
                        :
                        <div key={item._id}>
                          <div className="flex flex-col">
                            <span>Skill :{formData.skills[index]?.skill}</span>
                          </div>
                          {item.name}h
                          {item?.rateting}h
                        </div>
                    )) : null}
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <button onClick={handleCostSelect} className="p-1 bg-o1 font-bold text-b1 rounded">Select</button>
                    <button onClick={handleCostEdit} className="p-1 bg-o1 font-bold text-b1 rounded">Edit</button>
                  </div>
                </div>
                {
                  showCostEdit &&
                  <div className="flex justify-center items-center gap-2  ">
                    <div className="flex flex-row gap-2">

                      {empeditdata.map((innerArray, outerIndex) => (
                        <div key={outerIndex} className="border border-o1 flex flex-col p-2 gap-2 rounded ">
                          <div className="flex items-center justify-center">
                            <span className="text-o1 font-bold ">{formData.skills[outerIndex]?.skill}</span>
                          </div>

                          {innerArray.map((item, innerIndex) => (
                            <div key={innerIndex} >
                              <div className="flex flex-row gap-1">
                                <input
                                  type="checkbox"
                                  id={`checkbox_${outerIndex}_${innerIndex}`}
                                  name={`checkbox_${outerIndex}`}
                                  // checked={bestData.some(itemb => itemb.some(subItem => subItem.name === item.name))}
                                  value={[outerIndex, innerIndex]}
                                // value={item.name}
                                />
                                <label htmlFor={`checkbox_${outerIndex}_${innerIndex}`}>{item.name}</label>
                                <span> - {Math.round(Number(item?.rateting))}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}


                    </div>
                    <button className="h-10 p-1  rounded bg-o1 font-bold text-b1 " onClick={handleSelection}>Select</button>
                  </div>

                }
              </div>

            </div>
            :
            <div className="w-full bg-b2 shadow-2xl p-2 rounded-xl">
              <form onSubmit={handleForm} >
                <div className="flex flex-row  gap-6">
                  {/* left div */}
                  <div className="flex flex-col w-1/2  gap-2">
                    <span className="font-bold p-3 text-o1"><u>Client Information</u></span>

                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3">Client Name </span>
                      <div className=" w-2/3">
                        <input
                          className="w-full p-2 bg-b3 border border-black"
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              clientName: event.target.value,
                            });
                          }} required />
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3">Importance Rating</span>
                      <div className=" w-2/3 flex gap-4 justify-center">
                        <input
                          className="p-2"
                          type="radio"
                          id={`radio_1`}
                          name={`radio_1`}
                          value={"h"}

                        />
                        <label className="p-2" >Low</label>
                        <input
                          className="p-2"
                          type="radio"
                          id={`radio_1`}
                          name={`radio_1`}
                          value={"h"}

                        />
                        <label className="p-2" >Medium</label>
                        <input
                          className="p-2"
                          type="radio"
                          id={`radio_1`}
                          name={`radio_1`}
                          value={"h"}

                        />
                        <label className="p-2" >High</label>
                      </div>
                    </div>
                    <span className="font-bold p-3 text-o1"><u>Project Information</u></span>
                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3">Project Name</span>
                      <div className=" w-2/3">
                        <input
                          className="w-full bg-b3 p-2 border border-black"
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              projectName: event.target.value,
                            });
                          }} required />
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3">Estimated Cost</span>
                      <div className=" w-2/3" >
                        <input
                          className="w-full p-2 bg-b3  border border-black"
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              estimatedCost: event.target.value,
                            });
                          }} required />
                      </div>
                    </div>
                    <span className="font-bold p-3 text-o1"><u>Skills or Stack</u></span>
                    {formData.skills.map((skill, index) => (

                      <div key={index} className="flex flex-row gap-2">
                        <span className=" p-2">Skills</span>

                        <div className="flex flex-col gap-2 w-2/3 ">
                          <div className="relative">
                            <button type="button" className="bg-b3 p-2 rounded"
                              onClick={() => handleCategoryToggle1(index)}>
                              {skill.skill ? skill.skill : "Select Skill"}

                            </button>
                            {showCategories[index] && (
                              <div className="absolute top-full left-0 bg-b2 rounded shadow-md w-full z-10">
                                {Object.entries(skillsData).map(([category, skills]) => (
                                  <div key={category} className="border-t border-gray-300">
                                    <div
                                      className="flex items-center justify-between cursor-pointer px-4 py-2"
                                      onClick={() => handleCategoryToggle(category)}
                                    >
                                      <span className="text-o1 font-bold">{category}</span>
                                      <svg
                                        className="h-5 w-5 transform transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        style={{ transform: category === selectedCategory ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                      ></svg>
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </div>
                                    {selectedCategory === category && (
                                      <div className="px-2">
                                        <select
                                          className="w-full p-2 bg-b3 rounded border border-black"
                                          value={skill.skill}
                                          name="skill"
                                          onChange={(event) => {
                                            handleSkillChange(index, event)
                                            setShowCategories(false)
                                          }}
                                          required
                                        >
                                          <option value="">Select Skill</option>
                                          {skills.map((skillName) => (
                                            <option key={skillName} value={skillName}>
                                              {skillName}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className=" p-2" >Percentage</span>
                        <div>
                          <input
                            className="w-full p-2 bg-b3 rounded border border-black"
                            type="number"
                            value={skill.percentage}
                            name="percentage"
                            onChange={(event) => handleSkillChange(index, event)}
                            required
                          />
                        </div>
                        <button
                          className="bg-o1 text-b1 font-bold p-2 rounded border border-sky-900 "
                          type="button" onClick={() => removeSkill(index)}>
                          Remove
                        </button>
                      </div>

                    ))}
                    {
                      pexVal > 100 ?
                        <div className="bg-o1 text-b1 font-bold p-2 rounded border  border-sky-900 flex justify-center items-center">
                          Total Precentage Exceeded
                        </div>
                        :
                        <button
                          className="bg-o1 text-b1 font-bold p-2 rounded border  border-sky-900"
                          type="button" onClick={addSkill}>
                          Add Skill
                        </button>
                    }

                  </div>
                  {/* right div */}
                  <div className="flex flex-col w-1/2 bg-red-100 gap-2">
                    <span className="font-bold p-3 text-o1"><u>Estimated Timeline</u></span>

                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3">Start Date</span>
                      <div className=" w-2/3">
                        <DatePicker
                          className="w-full p-2 bg-b3 rounded border border-black"
                          selected={formData.startDate}
                          onChange={handleStartDateChange}
                          dateFormat="MM/dd/yyyy"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3" >End Date</span>
                      <div className=" w-2/3">
                        <DatePicker
                          className="w-full p-2 bg-b3 rounded border border-black"
                          selected={formData.endDate}
                          onChange={handleEndDateChange}
                          dateFormat="MM/dd/yyyy"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                      <span className=" p-2 w-1/3" >Man hours Required</span>
                      <div>
                        <input
                          className="w-full p-2 bg-b3 rounded border border-black"
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              manHr: event.target.value,
                            });
                          }} required />
                      </div>
                    </div>
                    <span className="font-bold p-3 text-o1"><u>Member Selection</u></span>

                    <div className="bg-yellow-300 w-full border  border-sky-900  p-2 gap-2 flex flex-col">
                      <div className="flex flex-row gap-2 ">
                        <span className=" p-2 w-1/3" >Name</span>
                        <div className=" w-2/3">
                          <input
                            className="w-full p-2 bg-b3 rounded border border-black"
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                empName: event.target.value,
                              });
                            }} />
                        </div>
                      </div>

                      <div className="flex flex-row gap-2">
                        <span className=" p-2 w-1/3" >Role</span>
                        <div className=" w-2/3">
                          <select
                            className="w-full p-2 bg-b3 rounded border border-black"
                            value={formData.empRole}
                            name="skill"
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                empRole: event.target.value,
                              });
                            }}

                          >
                            <option value="">Select Skill</option>
                            {["Intern", "Associate", "Senior", "Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"].map((skillName) => (
                              <option key={skillName} value={skillName}>
                                {skillName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* <div className="flex flex-row gap-2">
                        <span className=" p-2 w-1/3" >Role</span>
                        <div className=" w-2/3">
                          <input
                            className="w-full p-2 bg-b3 rounded border border-black"
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                empRole: event.target.value,
                              });
                            }} />
                        </div>
                      </div> */}

                      {formData.skills.map((skill, index) => (

                        <div key={index} className="flex flex-row gap-2">
                          <span className=" p-2 w-1/3" >Skill</span>

                          <div className="w-2/3 ">
                            <div className="relative">
                              <button type="button" className="w-full p-2 bg-b3 rounded border border-black"
                                onClick={() => handleCategoryToggle2(index)}>
                                {formData.empSkill ? formData.empSkill : "Select Skill"}

                              </button>
                              {showCategories2[index] && (
                                <div className="absolute top-full left-0 bg-b2 rounded shadow-md w-full z-10">
                                  {Object.entries(skillsData).map(([category, skills]) => (
                                    <div key={category} className="border-t border-gray-300">
                                      <div
                                        className="flex items-center justify-between cursor-pointer px-4 py-2"
                                        onClick={() => handleCategoryToggle3(category)}
                                      >
                                        <span className="text-o1 font-bold">{category}</span>
                                        <svg
                                          className="h-5 w-5 transform transition-transform"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          style={{ transform: category === selectedCategory ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        ></svg>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                      </div>
                                      {selectedCategory2 === category && (
                                        <div className="px-2">
                                          <select
                                            className="w-full p-2 bg-b3 rounded border border-black"
                                            value={skill.skill}
                                            name="skill"
                                            onChange={(event) => {
                                              setFormData({
                                                ...formData,
                                                empSkill: event.target.value,
                                              });
                                              setShowCategories2(false)
                                            }}
                                            required
                                          >
                                            <option value="">Select Skill</option>
                                            {skills.map((skillName) => (
                                              <option key={skillName} value={skillName}>
                                                {skillName}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                        </div>

                      ))}

                      {/* <div className="flex flex-row gap-2">
                        <span className=" p-2 w-1/3" >Skill</span>
                        <div className=" w-2/3">
                          <select
                            className="w-full p-2 bg-b3 rounded border border-black"
                            value={formData.empSkill}
                            name="skill"
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                empSkill: event.target.value,
                              });
                            }}

                          >
                            <option value="">Select Skill</option>
                            {["skill1", "skill2", "skill3"].map((skillName) => (
                              <option key={skillName} value={skillName}>
                                {skillName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div> */}

                      <button type="button" onClick={handelFind} className="bg-o1 text-b1 font-bold rounded p-2 ">Find</button>
                      {
                        empAvilable ?
                          <div className="flex flex-row gap-2 justify-center">
                            <span className=" p-2 w-1/3">Employee : {formData.empName} is Avilable</span>
                            <button onClick={addEmpToform} type="button" className="p-2 rounded bg-o1 text-b1 font-bold">Add</button>
                          </div>
                          : shiowAvilable && <span>Employee not Avilable</span>
                      }
                      {
                        SelectedEmp.length != 0 &&
                        <div className="flex flex-col">
                          <span className="font-bold p-3 text-o1" >Selectted Employees</span>
                          {formData.selectedEmp?.map((employee, index) => (
                            employee.length != 0 &&
                            <div key={index} className="flex flex-row p-2">
                              
                              <span>For <span className="text-o1">{employee[1]}</span> : Selected Employee <span className="text-o1">{employee[0]}</span></span>
                            </div>
                          ))}

                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 mt-2 justify-center">
                  <button type="submit" className="bg-o1 text-b1 font-bold p-2 rounded-lg w-32 border border-black">Submit</button>
                </div>
              </form>
            </div>
        }





        {/* {
          showMid ?
            <div className="bg-sky-300 w-1/2 p-2 rounded-2xl">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="p-2 border border-sky-600 rounded-2xl w-full">
                  <div>
                    <label
  
                      htmlFor="customRange3"
                      className="mb-2 inline-block text-black "
                    >Profit</label
                    >
                    <input
                      type="range"
                      className="transparent h-[8px] w-full cursor-pointer appearance-none border-transparent bg-sky-600 rounded-2xl"
                      min="0"
                      max="10"
                      step="2.5"
                      id="customRange3" />
                  </div>
  
                </div>
                <div className="p-2 w-1/2 bg-sky-200 rounded-2xl flex flex-col gap-2">
                  <span className="flex justify-center"><u>Best Option</u></span>
  
                  <div className="flex flex-col">
                    {bestData != "" ? bestData.map((item, index) => (
                      item.name == null ?
                        <div key={item[0]._id}>
                          <span>For {formData.skills[index]?.skill}: {item[0].name}</span>
                        </div>
                        :
                        <div key={item._id}>
                          <span>For {formData.skills[index]?.skill}: {item.name}</span>
                        </div>
                    )) : null}
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <button onClick={handleBestSelect} className="p-1 bg-sky-400 rounded">Select</button>
                    <button className="p-1 bg-sky-400 rounded">Edit</button>
                  </div>
                </div>
                <div className="p-2 w-1/2 bg-sky-200 rounded-2xl flex flex-col gap-2">
                  <span className="flex justify-center"><u>Avg Option</u></span>
  
                  <div className="flex flex-col">
                    {avgData != "" ? avgData.map((item, index) => (
                      item.name == null ?
                        <div key={item[0]._id}>
                          <span>For {formData.skills[index]?.skill}: {item[0].name}</span>
                        </div>
                        :
                        <div key={item._id}>
                          <span>For {formData.skills[index]?.skill}: {item.name}</span>
                        </div>
                    )) : null}
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <button onClick={handleAVGSelect} className="p-1 bg-sky-400 rounded">Select</button>
                    <button className="p-1 bg-sky-400 rounded">Edit</button>
                  </div>
                </div>
                <div className="p-2 w-1/2 bg-sky-200 rounded-2xl flex flex-col gap-2">
                  <span className="flex justify-center"><u>Cost Option</u></span>
  
                  <div className="flex flex-col">
                    {costData != "" ? costData.map((item, index) => (
                      item.name == null ?
                        <div key={item[0]._id}>
                          <span>For {formData.skills[index]?.skill}: {item[0].name}</span>
                        </div>
                        :
                        <div key={item._id}>
                          <span>For {formData.skills[index]?.skill}: {item.name}</span>
                        </div>
                    )) : null}
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <button onClick={handleCostSelect} className="p-1 bg-sky-400 rounded">Select</button>
                    <button className="p-1 bg-sky-400 rounded">Edit</button>
                  </div>
                </div>
              </div>
  
            </div>
            :
            <form className="flex flex-col items-center gap-2 bg-sky-300 p-2 rounded-2xl" onSubmit={handleForm} >
              <span className="font-bold p-3"><u>Client Information</u></span>
  
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3">Client Name </span>
                <div className=" w-2/3">
                  <input
                    className="w-full p-2 rounded-2xl border border-black"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        clientName: event.target.value,
                      });
                    }} required />
                </div>
              </div>
  
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3">Importance Rating</span>
                <div className=" w-2/3">
                  <input
                    className="w-full p-2 rounded-2xl border border-black"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        importanceRating: event.target.value,
                      });
                    }} />
                </div>
              </div>
              <span className="font-bold p-3"><u>Project Information</u></span>
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3">Project Name</span>
                <div className=" w-2/3">
                  <input
                    className="w-full p-2 rounded-2xl border border-black"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        projectName: event.target.value,
                      });
                    }} required />
                </div>
              </div>
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3">Estimated Cost</span>
                <div className=" w-2/3" >
                  <input
                    className="w-full p-2 rounded-2xl border border-black"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        estimatedCost: event.target.value,
                      });
                    }} required />
                </div>
              </div>
              <span className="font-bold p-3"><u>Estimated Timeline</u></span>
  
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3">Start Date</span>
                <div className=" w-2/3">
                  <DatePicker
                    className="w-full p-2 rounded-2xl border border-black"
                    selected={formData.startDate}
                    onChange={handleStartDateChange}
                    dateFormat="MM/dd/yyyy"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3" >End Date</span>
                <div className=" w-2/3">
                  <DatePicker
                    className="w-full p-2 rounded-2xl border border-black"
                    selected={formData.endDate}
                    onChange={handleEndDateChange}
                    dateFormat="MM/dd/yyyy"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 w-full">
                <span className=" p-2 w-1/3" >Man hours Required</span>
                <div>
                  <input
                    className="w-full p-2 rounded-2xl border border-black"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        manHr: event.target.value,
                      });
                    }} required />
                </div>
              </div>
              <span className="font-bold p-3 "><u>Skills/stack</u></span>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <span className=" p-2">Skills</span>
                  <div>
                    <select
                      className="w-full p-2 rounded-2xl border border-black"
                      value={skill.skill}
                      name="skill"
                      onChange={(event) => handleSkillChange(index, event)}
                      required
                    >
                      <option value="">Select Skill</option>
                      {["skill1", "skill2", "skill3"].map((skillName) => (
                        <option key={skillName} value={skillName}>
                          {skillName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className=" p-2" >Percentage</span>
                  <div>
                    <input
                      className="w-full p-2 rounded-2xl border border-black"
                      type="number"
                      value={skill.percentage}
                      name="percentage"
                      onChange={(event) => handleSkillChange(index, event)}
                      required
                    />
                  </div>
                  <button
                    className="bg-sky-500 p-2 rounded-2xl border border-sky-900 "
                    type="button" onClick={() => removeSkill(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="bg-sky-500 p-2 rounded-2xl border  border-sky-900"
                type="button" onClick={addSkill}>
                Add Skill
              </button>
              <span className="font-bold p-3"><u>Team Requirements</u></span>
  
              <div className="bg-yellow-300 w-full border  border-sky-900 rounded-2xl p-2 gap-2 flex flex-col">
                <div className="flex flex-row gap-2 ">
                  <span className=" p-2 w-1/3" >Name</span>
                  <div className=" w-2/3">
                    <input
                      className="w-full p-2 rounded-2xl border border-black"
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          empName: event.target.value,
                        });
                      }} required />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <span className=" p-2 w-1/3" >Role</span>
                  <div className=" w-2/3">
                    <input
                      className="w-full p-2 rounded-2xl border border-black"
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          empRole: event.target.value,
                        });
                      }} required />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <span className=" p-2 w-1/3" >Skill</span>
                  <div className=" w-2/3">
                    <select
                      className="w-full p-2 rounded-2xl border border-black"
                      value={formData.empSkill}
                      name="skill"
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          empSkill: event.target.value,
                        });
                      }}
                      required
                    >
                      <option value="">Select Skill</option>
                      {["skill1", "skill2", "skill3"].map((skillName) => (
                        <option key={skillName} value={skillName}>
                          {skillName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
  
                <button type="button" onClick={handelFind} className="bg-sky-500 p-2 rounded-2xl">Find</button>
                {
                  empAvilable ?
                    <div className="flex flex-row gap-2 justify-center">
                      <span className=" p-2 w-1/3">Emp : {formData.empName} is Avilable</span>
                      <button onClick={addEmpToform} type="button" className="p-2 rounded-2xl bg-sky-500">Add</button>
                    </div>
                    : shiowAvilable && <span>Emp not Avilable</span>
                }
              </div>
  
              <div className="flex flex-row gap-2">
                <button type="submit" className="bg-sky-500 p-2 rounded-2xl border border-black">Submit</button>
              </div>
            </form>
        } */}
      </div>
      <ToastContainer />
    </main>
  );
}