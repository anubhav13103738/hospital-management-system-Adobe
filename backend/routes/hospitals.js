const express = require('express');
const router = express.Router();

const hospitalController = require('../controllers/hospital');

router.post('', hospitalController.addHospital);

router.get('', hospitalController.getAllHospitals);

router.get('/:id', hospitalController.getHospitalbyId);

router.put('/:id', hospitalController.updateHospital);

router.delete('/:id', hospitalController.removeHospital);


module.exports = router;
