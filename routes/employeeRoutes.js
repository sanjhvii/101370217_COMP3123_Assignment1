const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// GET: User can get all employee list (Endpoint #3)
router.get("/employees", employeeController.getAllEmployees);

// POST: User can create a new employee (Endpoint #4)
router.post("/employees", employeeController.createEmployee);

// GET: User can get employee details by employee id (Endpoint #5)
router.get("/employees/:eid", employeeController.getEmployeeById);

// PUT: User can update employee details (Endpoint #6)
router.put("/employees/:eid", employeeController.updateEmployee);

// DELETE: User can delete employee by employee id (Endpoint #7)
router.delete("/employees", employeeController.deleteEmployeeById);

module.exports = router;