const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department');

router.post('', departmentController.addDepartment);

router.get('', departmentController.getAllDepartments);

router.get('/:id', departmentController.getDepartmentbyId);

router.get('/hospital/:hospitalname', departmentController.getDepartmentbyHospitalName);

router.put('/:id', departmentController.updateDepartment);

router.delete('/:id', departmentController.removeDepartment);


module.exports = router;
