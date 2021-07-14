const short = require('short-uuid');

// let hospitals = [
//   { _id: '1', hospitalname: 'KIMS', contactnumber: '9632587410' },
//   { _id: '2', hospitalname: 'CSI Mission Hospital', contactnumber: '9685321470' }
// ];


//parse json
const fs = require('fs');
const path = require('path');
let hospitals;
fs.readFile(path.join(__dirname, '..', 'hospitals.json'), 'utf8', function (err, data) {
  if (err) throw err;
  hospitals = JSON.parse(data);
  // console.log(hospitals);
});



// add a new hospital
exports.addHospital = async (req, res, next) => {
  // console.log("post hit");
  let hospital = req.body;
  // console.log(req.body);
  delete hospital['_id'];
  let newId = await short.generate();
  let hospitalWithId = { _id: newId, ...hospital };
  hospitals.push(hospitalWithId);
  // console.log(hospitals);
  res.status(201).json({
    message: 'Hospital Added Successfully!',
    hospital: {
      _id: newId,
      hospitalname: hospitalWithId.hospitalname,
      contactnumber: hospitalWithId.contactnumber
    }
  });
}


// get all hospitals
exports.getAllHospitals = (req, res, next) => {
  res.status(200).json(hospitals);
}


// get a hospital by ID
exports.getHospitalbyId = (req, res, next) => {
  let flag = 0;
  hospitals.forEach((element, index) => {
    if (element._id === req.params.id) {
      flag = 1;
      res.status(200).json(element);
    } else {
      if (index === hospitals.length - 1 && flag === 0) {
        res.status(404).json({ 'message': 'hospital not found' });
      }
    }
  });
}


// update hospital data
exports.updateHospital = (req, res, next) => {
  let hospital = req.body;
  // console.log(req.body);
  let flag = 0;
  hospitals.forEach((element, index) => {
    if (element._id === req.params.id) {
      flag = 1;
      hospitals[index] = hospital;
      res.status(201).json({
        message: 'Hospital Updated Successfully!',
        hospital: {
          id: hospital._id,
          hospitalname: hospital.hospitalname,
          contactnumber: hospital.contactnumber
        }
      });
    } else {
      if (index === hospitals.length - 1 && flag === 0) {
        res.status(404).json({ 'message': 'hospital not found/ could not be updated' });
      }
    }
  });
}


// remove a hospital
exports.removeHospital = (req, res, next) => {
  let flag = 0;
  // console.log(hospitals);
  hospitals.forEach((element, index) => {
    // console.log(element);
    if (element._id === req.params.id) {
      flag = 1;
      hospitals.splice(index, 1);
      res.status(200).json({
        message: 'hospital deleted successfully'
      });
      // console.log(hospitals);
    } else {
      if (index === hospitals.length - 1 && flag === 0) {
        res.status(404).json({ 'message': 'hospital not found/ could not be deleted' });
      }
    }
  });
}
