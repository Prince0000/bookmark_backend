require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const collectionRoute = require('./routes/Collections')
const bookmarkRoutes = require('./routes/bookmarks')

// Validate required environment variables
if (!process.env.DB) {
    console.error("Missing required DB environment variable.");
    process.exit(1);
}

// Database connection
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/collections',collectionRoute);
app.use( '/api/bookmark', bookmarkRoutes )

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
