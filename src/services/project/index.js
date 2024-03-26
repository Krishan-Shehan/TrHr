

export const getProjectsData = async () => {
    try {
        const res = await fetch("/api/getAllProjects", {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const handleProjectsDataById = async (Pid) => {
    console.log("🚀 ~ handleProjectsDataById ~ id:", Pid)

    try {
        const res = await fetch(`/api/ProjectsDataById?id=${Pid}`, {
            method: "GET",
            cache: "no-store",
            // headers: {
            //   Authorization: `Bearer ${Cookies.get("token")}`,
            // },
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};


export const updateProjectData = async (projectName) => {
    const newform = {
        projectName: projectName,
    }

    console.log("🚀 ~ addProject ~ newform:", newform)
    // return newform;
    try {
        const response = await fetch("/api/projectUpdateStatus", {
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

export const updateProjectRating = async (projectrating,projectName) => {
    const newform = {
        projectrating: projectrating,
        projectName: projectName,
    }

    console.log("🚀 ~ addProject ~ newform:", newform)
    // return newform;
    try {
        const response = await fetch("/api/projectUpdateRating", {
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

export const updateProjectRatingSH = async (projectrating,projectName) => {
    const newform = {
        projectrating: projectrating,
        projectName: projectName,
    }

    console.log("🚀 ~ addProject ~ newform:", newform)
    // return newform;
    try {
        const response = await fetch("/api/projectUpdateRatingSH", {
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