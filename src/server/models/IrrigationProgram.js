const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for daily configuration
const irrigationDaySchema = new Schema({
    day: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});

const irrigationProgramSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true
    },
    hour: {
        type: String,
        required: function() {
            return this.selected;
        }
    },
    duration: {
        type: Number,
        required: function() {
            return this.selected;
        }
    },
    wateringDays: {
        type: [irrigationDaySchema],
        monday: irrigationDaySchema,
        tuesday: irrigationDaySchema,
        wednesday: irrigationDaySchema,
        thursday: irrigationDaySchema,
        friday: irrigationDaySchema,
        saturday: irrigationDaySchema,
        sunday: irrigationDaySchema,
        required: true
    }
});

irrigationProgramSchema.pre('findOneAndUpdate', async function(next) {
    const docToUpdate = this._update.$set;

    if (docToUpdate.active === true) {
        // Deactivate other active programs
        await this.model.updateMany({ _id: { $ne: this.getQuery()._id } }, { $set: { active: false } });
    }

    if (docToUpdate.wateringDays) {
        const activeDays = Object.values(docToUpdate.wateringDays).filter(day => day.selected);
        if (activeDays.length === 0) {
            const error = new Error('At least one day must be active');
            error.code = 433;
            next(error);
        } else {
            next();
        }
    }
});

module.exports = mongoose.model('IrrigationProgram', irrigationProgramSchema);