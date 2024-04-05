# MERN File Management System with User Authentication

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based file management system with login/signup functionality. It allows users to upload PDF files, manage their uploaded files, and grant access to other users for reading, writing, and deleting files.

## Features

- **User Authentication:** Users can sign up and log in to access the system.
- **File Upload:** Authenticated users can upload PDF files to the system.
- **File Management:** Users can view, edit, and delete their uploaded files.
- **Access Control:** Users can grant access to other users for reading, writing, or deleting specific files.

## Technologies Used

- **MongoDB:** For storing user data and file information.
- **Express.js:** Backend framework for handling HTTP requests and routing.
- **React.js:** Frontend library for building user interfaces.
- **Node.js:** Server-side JavaScript runtime environment.
- **JSON Web Tokens (JWT):** For user authentication and authorization.
- **Multer:** Middleware for handling file uploads in Node.js.
- **bcrypt.js:** For hashing user passwords securely.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd FMS and npm install 
   cd Backend npm install

## Set .env Variables

    PORT=3001
    MONGODB_URI=<your-mongodb-uri>
    SECRET_KEY=<your-secret-key-for-JWT>

## Running Instructions
    cd Backend && npm start
    cd FMS && npm start