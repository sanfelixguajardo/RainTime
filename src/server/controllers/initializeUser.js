require('dotenv').config();
const mongoose = require('mongoose');
const user = require('../models/User');
const bcrypt = require('bcrypt');


mongoose.connect('process.env.DATABASE_URI');


mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');
    const username = 'user';
    const pwd = 'passwd';
    const hashedPassword = await bcrypt.hash(pwd, 10);

    const authorizeUser = {
        username: username,
        password: hashedPassword
    };

    async function initializeDatabase() {
        try {

            await user.create(authorizeUser);
            console.log('authorizeUser initialized successfully!');

        } catch (error) {
            console.error('Error when initializing DB', error);
        } finally {
            // Closes connection with data base
            await mongoose.connection.close();
        }
    }

    initializeDatabase();
});

