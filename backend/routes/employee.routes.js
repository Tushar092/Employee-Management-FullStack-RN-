const express = require("express");
const { EmployeeModel } = require("../models/employee.model");
const employeeRoute = express.Router();

employeeRoute.get("/", async (req, res) => {
    const employees = await EmployeeModel.find();
    res.json(employees);
});

employeeRoute.post("/createEmployee", async (req, res) => {
    const {email, firstname, lastname, department, salary} = req.body;
    try {
            const employee = new EmployeeModel({ firstname, lastname, email, department, salary });
            await employee.save();
            res.json({ msg: "Employee created", "employee_added": req.body });
    } catch (error) {
        console.log("error:", error.message);
    }
});

employeeRoute.put("/updateEmployee", async (req, res) => {
    const {email, firstname, lastname, department, salary} = req.body;
    try {
            const employee = new EmployeeModel({ firstname, lastname, email, department, salary });
            await employee.save();
            res.json({ msg: "Employee created", "employee_added": req.body });
    } catch (error) {
        console.log("error:", error.message);
    }
});

employeeRoute.delete("/deleteEmployee", async (req, res) => {
    const {email, firstname, lastname, department, salary} = req.body;
    try {
            const employee = new EmployeeModel({ firstname, lastname, email, department, salary });
            await employee.save();
            res.json({ msg: "Employee created", "employee_added": req.body });
    } catch (error) {
        console.log("error:", error.message);
    }
});

module.exports = { employeeRoute }