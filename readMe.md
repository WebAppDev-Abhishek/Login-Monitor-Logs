# **Login Monitor Application**

A simple Node.js web application built with Express.js, EJS, and SQLite3 to demonstrate a login form with a monitoring log. It logs every login attempt (successful or failed) to a database, including the username, status, timestamp, and IP address.

## **Features**

* **User Login:** A basic login form for user authentication.  
* **Login Monitoring:** Records all login attempts (success/failure) in a SQLite database.  
* **Detailed Logs:** Each log entry includes timestamp, username, login status, and client IP address.  
* **Dedicated Success Page:** Redirects to a separate page upon successful login.  
* **Log Viewer:** A dedicated page to view all recorded login attempts.  
* **HTML Sanitization:** Uses dompurify to prevent Cross-Site Scripting (XSS) vulnerabilities by sanitizing data before rendering.  
* **Modular Structure:** Backend logic is separated into distinct files (server.js, db.js, routes/index.js) for better organization.  
* **Simple Database:** Uses SQLite3 for easy setup and demonstration purposes.

## **Technologies Used**

* **Node.js**: JavaScript runtime environment.  
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.  
* **EJS (Embedded JavaScript)**: Templating engine for generating dynamic HTML.  
* **SQLite3**: A self-contained, high-reliability, full-featured, small-sized, and fast SQL database engine.  
* **body-parser**: Node.js middleware for parsing incoming request bodies.  
* **dompurify**: A DOM-only XSS sanitizer for HTML, MathML and SVG.  
* **jsdom**: A JavaScript implementation of the WHATWG DOM and HTML standards, used to provide a window environment for dompurify in Node.js.  
* **Tailwind CSS**: A utility-first CSS framework for styling the frontend.

## **File Structure**

login-monitor-app/  
├── node\_modules/         \# Installed Node.js packages  
├── routes/               \# Defines application routes and logic  
│   └── index.js          \# Main routes file  
├── views/                \# EJS template files for frontend  
│   ├── login.ejs         \# Login form page  
│   ├── logs.ejs          \# Monitor logs display page  
│   └── success.ejs       \# Login successful page  
├── db.js                 \# Database initialization and connection  
├── package.json          \# Project metadata and dependencies  
├── package-lock.json     \# Exact dependency versions  
└── server.js             \# Main application entry point

## **Setup and Installation**

To get this project up and running on your local machine, follow these steps:

1. Clone the repository (or create the project structure manually):  
   If you have the project files, navigate to the root directory. Otherwise, create a folder named login-monitor-app and set up the file structure as described above, placing the provided code into the respective files.  
2. **Navigate into the project directory:**  
   cd login-monitor-app

3. Install dependencies:  
   This command reads the package.json file and installs all the necessary Node.js modules.  
   npm install

## **How to Run the Application**

Once all dependencies are installed, you can start the server:

npm start

You should see output similar to this in your terminal:

Connected to the SQLite database.  
Logs table created or already exists.  
Server running at http://localhost:3000  
Login form: http://localhost:3000  
Monitor logs: http://localhost:3000/logs

## **How to Use**

1. Access the Login Form:  
   Open your web browser and go to:  
   http://localhost:3000  
2. **Login Credentials (for demonstration):**  
   * **Successful Login:**  
     * Username: user  
     * Password: password123  
   * **Failed Login:**  
     * Use any other username or password.  
3. **Login Flow:**  
   * If login is **successful**, you will be redirected to a dedicated "Login Successful\!" page.  
   * If login **fails**, you will remain on the login page with an error message.  
4. View Monitor Logs:  
   You can access the monitor logs page directly or by clicking the "View Monitor Logs" link on the login or success pages:  
   http://localhost:3000/logs  
   This page will display a table of all recorded login attempts, including their status and IP address.

## **Future Improvements / Considerations**

* **User Management:** Implement a proper user registration and management system (e.g., using a more robust database like PostgreSQL or MongoDB).  
* **Password Hashing:** Use a strong password hashing library like bcrypt to securely store user passwords (never store plain text passwords in a real application\!).  
* **Session Management:** Implement sessions or JWTs for persistent user authentication.  
* **Input Validation:** Add more robust server-side input validation beyond basic sanitization.  
* **Error Handling:** Implement more comprehensive error handling and logging for production environments.  
* **Environment Variables:** Use environment variables for sensitive data (e.g., database connection strings, secret keys).  
* **Frontend Framework:** For a more complex frontend, consider using a framework like React, Vue, or Angular instead of just EJS.  
* **Styling:** Further enhance the UI/UX with more custom CSS or a component library.  
* **Database Scaling:** For larger applications, consider a more scalable database solution.