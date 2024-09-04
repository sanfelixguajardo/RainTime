const IrrigationProgram = require('../models/IrrigationProgram');
const { sendProgramToQueue } = require('../customFunc/rabbitMQ');
const getAllIrrigationPrograms = async (req, res) => {

   const programs = await IrrigationProgram.find();
   if (!programs) return res.status(204).json( {'message' : 'No irrigation program found'} );

   res.json(programs);
};

const createNewIrrigationProgram = async (req, res) => {

    const irrigationProgramSchema = IrrigationProgram.schema.obj;

    const schemaKeys = Object.keys(irrigationProgramSchema);
    const requiredFields = schemaKeys.filter(key => {
        const prop = irrigationProgramSchema[key];
        return prop.required === true;
    });


    const bodyKeys = Object.keys(req?.body);

    const missingFields = requiredFields.filter(field => !bodyKeys.includes(field));
    /*if (missingFields) {
        return res.status(400).json({ 'message': 'Missing required fields' });
    }*/

    try {

        const result = await IrrigationProgram.create(req.body);

        return res.status(201).json(result);

    } catch (err) {
        console.error(err);
        return res.status(500).json({'message': `Internal Server Error`});
    }
};

const deleteIrrigationProgram = async (req, res) => {
    if (!req.params._id) {
        return res.status(400).json({'message' : 'An id parameter is required'});
    }

    try {
        const result = await IrrigationProgram.deleteOne({_id: req.params._id});
        return res.json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({'message': 'Internal server error'});
    }
}

const updateIrrigationProgram = async (req, res) => {

    if (!req.body._id) {
        return res.status(400).json({'message' : 'An id parameter is required'});
    }

    const { _id, ...updatedFields } = req.body;

    try {
        const result = await IrrigationProgram.findOneAndUpdate(
            { _id: _id },
            { $set: updatedFields },
            { new: true, runValidators: true}
        );

        if (!result) {
            return res.status(404).json({'message': `No program matches ID ${req.body._id}`});
        }

        return res.json(result);

    } catch (error) {
        if (error.code === 433) {
            return res.status(433).json({'message': 'At least one day must be active'});
        }
        return res.status(500).json({'message': 'Internal Server Error'});
    }

};

const activateIrrigationProgram = async (req, res) => {

    const _id = req.params._id;

    try {
        const result = await IrrigationProgram.findOneAndUpdate(
            { _id: _id },
            { $set: { active: true } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({'message': `No program matches ID ${_id}`});
        }

        await sendProgramToQueue(JSON.stringify(result)) // send program that has been activated
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({'message': 'Internal Server Error'});
    }
}

const deactivateIrrigationProgram = async (req, res) => {

    const _id = req.params._id;

    try {
        const result = await IrrigationProgram.findOneAndUpdate(
            { _id: _id },
            { $set: { active: false } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({'message': `No program matches ID ${_id}`});
        }

        await sendProgramToQueue(JSON.stringify({})) // send empty program because it has been deactivated
        return res.json(result);

    } catch (error) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }
}


module.exports =  {

    getAllIrrigationPrograms,
    createNewIrrigationProgram,
    deleteIrrigationProgram,
    updateIrrigationProgram,
    activateIrrigationProgram,
    deactivateIrrigationProgram,
};