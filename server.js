const express = require('express'); // Express.js for building the web application
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const path = require('path'); // Utility for working with file and directory paths

// Import database initialization function
const initializeDatabase = require('./db');
// Import application routes
const appRoutes = require('./routes');

// Initialize Express app
const app = express();
const port = 3000; // Port on which the server will listen

// --- Middleware Setup ---

// Set EJS as the view engine. EJS allows for embedded JavaScript in templates.
app.set('view engine', 'ejs');
// Specify the directory where EJS template files are located.
app.set('views', path.join(__dirname, 'views'));

// Use body-parser middleware to parse URL-encoded data (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser middleware to parse JSON data (if you were sending JSON)
app.use(bodyParser.json());

// --- Database Initialization ---
// Initialize the database and pass the db instance to routes
let db;
initializeDatabase((err, database) => {
    if (err) {
        console.error('Failed to initialize database:', err.message);
        process.exit(1); // Exit if database cannot be initialized
    }
    db = database;
    // Pass the database instance to the routes module
    app.use('/', appRoutes(db));

    // --- Start the Server ---
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        console.log(`Login form: http://localhost:${port}`);
        console.log(`Monitor logs: http://localhost:${port}/logs`);
    });

    // --- Graceful Shutdown ---
    // Close the database connection when the Node.js process exits.
    process.on('exit', () => {
        if (db) {
            db.close((closeErr) => {
                if (closeErr) {
                    console.error('Error closing database:', closeErr.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        }
    });
});