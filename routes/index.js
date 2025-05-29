const express = require('express');

// Hardcoded User for Demonstration
// In a real application, you would fetch user credentials from a secure database
// and use password hashing (e.g., bcrypt) for security.
const VALID_USERNAME = 'user';
const VALID_PASSWORD = 'password123';

/**
 * Configures and returns the Express router with all application routes.
 * @param {sqlite3.Database} db - The SQLite database instance.
 * @returns {express.Router} The configured Express router.
 */
module.exports = (db) => {
    const router = express.Router();

    // GET route for the login form
    router.get('/', (req, res) => {
        // Render the 'login.ejs' template.
        res.render('login', { message: null });
    });

    // POST route to handle login form submission
    router.post('/login', (req, res) => {
        const { username, password } = req.body; // Extract username and password from the request body
        const ip_address = req.ip; // Get the IP address of the client making the request

        let status;
        let message;

        // Basic authentication check
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            status = 'success';
            message = 'Login successful!';
            console.log(`Successful login for user: ${username} from IP: ${ip_address}`);
        } else {
            status = 'failure';
            message = 'Invalid username or password.';
            console.log(`Failed login attempt for user: ${username} from IP: ${ip_address}`);
        }

        // Insert the login attempt details into the 'logs' table
        db.run(`INSERT INTO logs (username, status, ip_address) VALUES (?, ?, ?)`,
            [username, status, ip_address],
            function(err) { // Use a regular function here to access 'this.lastID'
                if (err) {
                    console.error('Error inserting log:', err.message);
                    // Even if logging fails, we should still respond to the user
                    return res.render('login', { message: 'An error occurred during logging. Please try again.' });
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                // Render the login page again, showing the login result message
                res.render('login', { message: message });
            }
        );
    });

    // GET route to display all monitor logs
    router.get('/logs', (req, res) => {
        // Select all entries from the 'logs' table, ordered by timestamp in descending order
        db.all(`SELECT id, timestamp, username, status, ip_address FROM logs ORDER BY timestamp DESC`, [], (err, rows) => {
            if (err) {
                console.error('Error fetching logs:', err.message);
                // Render an error message if logs cannot be fetched
                return res.render('logs', { logs: [], error: 'Could not retrieve logs.' });
            }
            // Render the 'logs.ejs' template, passing the fetched logs data
            res.render('logs', { logs: rows, error: null });
        });
    });

    return router;
};