export const testApi = async (formData) => {
    try {
        const response = await fetch("/api/employee", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getEmp = async (empName,empRole,empSkill) => {
    const newform = {
        empName: empName,
        empRole: empRole,
        empSkill:empSkill,
    }
    try {
        const response = await fetch("/api/getEmp", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newform),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }

}


export const getEmpBySkill = async (empSkill) => {
    const newform = {
        empSkill:empSkill,
    }
    console.log("🚀 ~ getEmpBySkill ~ newform:", newform)
    try {
        const response = await fetch("/api/getEmpBySkill", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newform),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }

}

export const updateEmpAv = async (emparr,skills,mnhr) =>{
    const newform = {
        employees:emparr,
        skills:skills,
        mnhr:mnhr,
    }

    console.log("🚀 ~ addProject ~ newform:", newform)
    // return newform;
    try {
        const response = await fetch("/api/empUpdateAvailability", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newform),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateEmpRateSH = async (empName,rate,projectName) =>{
    const newform = {
        empName:empName,
        rate:rate,
        projectName:projectName,
    }

    console.log("🚀 ~ addProject ~ newform:", newform)
    // return newform;
    try {
        const response = await fetch("/api/empUpdateRateByName", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newform),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}


export const addProject = async (clientname,projectName,emparr,empobj) => {
    const newform = {
        clientname: clientname,
        projectName: projectName,
        employees:emparr,
        employees_test:empobj
    }
    console.log("🚀 ~ addProject ~ newform:", newform)
    // return newform;
    try {
        const response = await fetch("/api/project_details", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newform),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const AddEmployeeData = async (formdata) => {
    // const newform = {
    //     clientname: clientname,
    //     projectName: projectName,
    //     employees:emparr,
    //     employees_test:empobj
    // }
    console.log("🚀 ~ addProject ~ formdata:", formdata)
    // return newform;
    try {
        const response = await fetch("/api/add_emp", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formdata),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};


export const getEmployeesData = async () => {
    try {
        const res = await fetch("/api/getAllEmployees", {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};