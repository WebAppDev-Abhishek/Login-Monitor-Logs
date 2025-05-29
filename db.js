// This module handles the initialization and connection to the SQLite database.

const sqlite3 = require('sqlite3').verbose(); // SQLite database driver

/**
 * Initializes the SQLite database and creates the 'logs' table if it doesn't exist.
 * @param {function(Error|null, sqlite3.Database|null)} callback - Callback function
 * to be called after database initialization.
 */
function initializeDatabase(callback) {
    // Initialize SQLite database. The database file will be 'monitor.db' in the project root.
    const db = new sqlite3.Database('./monitor.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return callback(err, null);
        }
        console.log('Connected to the SQLite database.');

        // Create the 'logs' table if it doesn't exist.
        // This table will store login attempt details.
        db.run(`CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            username TEXT NOT NULL,
            status TEXT NOT NULL, -- 'success' or 'failure'
            ip_address TEXT
        )`, (createErr) => {
            if (createErr) {
                console.error('Error creating logs table:', createErr.message);
                return callback(createErr, null);
            }
            console.log('Logs table created or already exists.');
            callback(null, db); // Pass the database instance back
        });
    });
}

module.exports = initializeDatabase;
