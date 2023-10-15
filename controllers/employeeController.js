const mongoose = require("mongoose");
const Employee = require("../models/Employee");

// GET: User can get all employee list
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ status: true, data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// POST: User can create a new employee
const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;

    // Create a new employee
    const employee = new Employee({
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    await employee.save();

    res.status(201).json({
      status: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// GET: User can get employee details by employee id
const getEmployeeById = async (req, res) => {
  try {
    const idString = req.params.eid;

    // Convert the string to ObjectId
    const id = new mongoose.Types.ObjectId(idString);

    // Use the converted 'id' in your query
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    res.status(200).json({ status: true, data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// PUT: User can update employee details
const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = req.body;
    const idString = req.params.eid;

    // Convert the string to ObjectId
    const id = new mongoose.Types.ObjectId(idString);

    // Use the converted 'id' in your query to find and update the employee
    const employee = await Employee.findByIdAndUpdate(id, updatedEmployee, {
      new: true,
    });

    if (!employee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    res.status(200).json({
      status: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// DELETE: User can delete employee by employee id
const deleteEmployeeById = async (req, res) => {
  try {
    const idString = req.query.eid;

    if (!idString) {
      return res
        .status(400)
        .json({ status: false, message: "Employee ID (eid) is required" });
    }

    // Convert the string to ObjectId
    const id = new mongoose.Types.ObjectId(idString);

    // Use the converted 'id' in your query to find and delete the employee
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeById,
};