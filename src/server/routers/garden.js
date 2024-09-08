const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');

router.route('/')
    .get(gardenController.getAllIrrigationPrograms)
    .post(gardenController.createNewIrrigationProgram);

router.route('/:_id')
    .get(gardenController.deleteIrrigationProgram)
    .put(gardenController.updateIrrigationProgram);

router.route('/activate/:_id')
    .get(gardenController.activateIrrigationProgram);

router.route('/deactivate/:_id')
    .get(gardenController.deactivateIrrigationProgram);

module.exports = router;
