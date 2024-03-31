const mongoose = require("mongoose");

// Set mongoose options (optional)
mongoose.set('strictQuery', false);

// Export an asynchronous function to establish database connection
module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        // Connect to the MongoDB database using environment variable for the connection URI
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to database successfully");
    } catch (error) {
        // If an error occurs during connection, log the error and throw it to the caller
        console.error("Error connecting to database:", error);
        console.log("Could not connect to database!");
        throw error;
    }
};
