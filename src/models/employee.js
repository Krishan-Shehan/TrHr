import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema(
    {
        name:String,
        role: String,
        skills:Array,
        Availability:{ type: Number, default: 160 },
        hourRate:String,
        projectCount:{ type: Number, default: 0 },
        rateting:{ type: Number, default: 0 },
        designation:String,
    },
    { timestamps: true }
);

const employees = mongoose.models.employees || mongoose.model("employees", employeesSchema);

export default employees;