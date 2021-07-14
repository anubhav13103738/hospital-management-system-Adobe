const short = require('short-uuid');

// let departments = [{
//   _id: '1', departmentname: 'nephrology', head: 'Dr. A P Kulashekhar',
//   contactnumber: '9876543210', hospitalname: 'KIMS'
// }, {
//   _id: '2', departmentname:
//     'neurology', head: 'Dr.B Raj Kumar', contactnumber: '9876543210',
//   hospitalname: 'KIMS'
// }, {
//   _id: '3', departmentname: 'cardiology', head: 'Dr. L Sri Devi',
//   contactnumber: '9876543210', hospitalname: 'KIMS'
// }, {
//   _id: '4', departmentname:
//     'ENT', head: 'Dr. K Ram Prasad', contactnumber: '9876543210', hospitalname:
//     'CSI Mission Hospital'
// }, { _id: '5', departmentname: 'opthalmology', head: 'Dr. J Sirisha', contactnumber: '9876543210', hospitalname: 'CSI Mission Hospital' }];


// parse json file
const fs = require('fs');
const path = require('path');
let departments;
fs.readFile(path.join(__dirname, '..', 'departments.json'), 'utf8', function (err, data) {
  if (err) throw err;
  departments = JSON.parse(data);
  // console.log(departments);
});

// add a new department
exports.addDepartment = async (req, res, next) => {
  // console.log("post hit");
  let department = req.body;
  // console.log(req.body);
  delete department['_id'];
  let newId = await short.generate();
  let departmentWithId = { _id: newId, ...department };
  departments.push(departmentWithId);
  res.status(201).json({
    message: 'Department Added Successfully!',
    department: {
      _id: newId,
      departmentname: departmentWithId.departmentname,
      contactnumber: departmentWithId.contactnumber,
      head: departmentWithId.head,
      hospitalname: departmentWithId.hospitalname
    }
  });
}

// get all new department
exports.getAllDepartments = (req, res, next) => {
  // console.log("post hit");
  if (departments.length > 0) {
    res.status(200).json(departments);
  } else {
    res.status(500).json({ message: 'Some error occurred!' });
  }
}

// get department by ID helps in updating.
exports.getDepartmentbyId = (req, res, next) => {
  // console.log("post hit");
  let flag = 0;
  departments.forEach((element, index) => {
    if (element._id === req.params.id) {
      flag = 1;
      res.status(200).json(element);
    } else {
      if (index === departments.length - 1 && flag === 0) {
        res.status(404).json({ 'message': 'department not found' });
      }
    }
  });
}


// update a department
exports.updateDepartment = (req, res, next) => {
  let department = req.body;
  // console.log(req.body);
  let flag = 0;
  departments.forEach((element, index) => {
    if (element._id === req.params.id) {
      flag = 1;
      departments[index] = department;
      res.status(201).json({
        message: 'Department Updated Successfully!',
        department: {
          id: department._id,
          departmentname: department.departmentname,
          contactnumber: department.contactnumber,
          head: department.head,
          hospitalname: department.hospitalname
        }
      });
    } else {
      if (index === departments.length - 1 && flag === 0) {
        res.status(404).json({ 'message': 'department not found/ could not be updated' });
      }
    }
  });
}

// delete a department
exports.removeDepartment = (req, res, next) => {
  let flag = 0;
  departments.forEach((element, index) => {
    if (element._id === req.params.id) {
      flag = 1;
      departments.splice(index, 1);
      res.status(200).json({
        message: 'department deleted successfully'
      });
    } else {
      if (index === departments.length - 1 && flag === 0) {
        res.status(404).json({ 'message': 'department not found/ could not be deleted' });
      }
    }
  });
}


// get departments by Hospital name
exports.getDepartmentbyHospitalName = (req, res, next) => {
  // console.log(req.params.hospitalname);
  let flag = 0;
  let results = [];
  departments.forEach((element, index) => {
    if (element.hospitalname === req.params.hospitalname) {
      flag = 1;
      results.push(element);
      if (flag > 0 && index === departments.length - 1) {
        res.status(200).json(results);
      }
      // res.status(200).json(element);
    } else {
      if (index === departments.length - 1) {
        if (flag === 0) {
          res.status(404).json({ 'message': 'department not found' });
        } else if (flag > 0) {
          res.status(200).json(results);
        }
      }
    }
  });
}
