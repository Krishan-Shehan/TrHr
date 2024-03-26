import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
    {
        clientname:String,
        projectName: String,
        employees:Array,
        employees_test:Object,
        cRate:Number,
        sRate:Number,
        projectStatus:{ type: Number, default: 0 },
    },
    { timestamps: true }
);

const projects = mongoose.models.projects || mongoose.model("projects", projectsSchema);

export default projects;