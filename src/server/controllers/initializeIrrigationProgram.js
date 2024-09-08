require('dotenv').config();
const mongoose = require('mongoose');
const user = require('../models/IrrigationProgram');


mongoose.connect('process.env.DATABASE_URI');

mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');
    const name = 'Program1';
    const active = false;

    const day1 = {
        day: 'L',
        selected: false,
    };

    const day2 = {
        day: 'M',
        selected: true,
    };

    const day3 = {
        day: 'X',
        selected: false,
    };

    const day4 = {
        day: 'J',
        selected: false,
    };

    const day5 = {
        day: 'V',
        selected: false,
    };

    const day6 = {
        day: 'S',
        selected: false,
    };

    const day7 = {
        day: 'D',
        selected: false,
    };

    const wateringDays = [day1, day2, day3, day4, day5, day6, day7];

    const program = {
        name: name,
        active: active,
        hour: '13:00',
        duration: 8,
        wateringDays: wateringDays
    };

    async function initializeDatabase() {
        try {

            await user.create(program);
            console.log('authorizeUser initialized successfully!');

        } catch (error) {
            console.error('Error when initializing DB', error);
        } finally {
            // Closes connectio with data base
            await mongoose.connection.close();
        }
    }

    initializeDatabase();
});

