# dealsdray-mern-intern-test
MERN MACHINE TEST WITH REFERENCE TO THE APPLICATION.

# Employee Management System

This project is a web application for managing employees, including creating, reading, updating, and deleting employee records. The application also supports user authentication, including login, registration, and protected routes for secure operations.

## **Features**
- User authentication using Passport.js (Local Strategy).
- CRUD operations for managing employees.
- Protected routes to ensure authorized access.

## Project Overview

This project demonstrates a full-stack application with the following core components:
- **Node.js/Express backend** for API routing and server-side logic.
- **React.js frontend** that interacts with the backend API to provide a dynamic user interface.
- **MongoDB database** to store application data.
  
The system includes user registration, login, and simple data interaction.

## **Technologies Used**

- **Backend**: Node.js, Express.js, Passport.js
- **Frontend**: React.js, TailwindCSS
- **Authentication**: Passport.js
- **Validation**: Mongoose, Regex
- **Frontend**: React.js, tailwindcss
- **Database**: MongoDB (with Mongoose)
- **Environment Management**: dotenv (for environment variables)

## Installation Instructions

### Clone the repository

Start by cloning the project to your local machine:

```bash
git clone https://github.com/krayush1109/dealsdray-mern-intern-test
cd dealsdray-mern-intern-test

```
## Set up environment variables in .env:

```css
SESSION_SECRET = random_kdf$@*djfk
MONGO_URI=<your-mongodb-connection-string>
```

# Backend Authentication Routes

| Route        | Method | Description                                  | Protected |
|--------------|--------|----------------------------------------------|-----------|
| `/login`     | POST   | Log in an existing user.                     | No        |
| `/logout`    | POST   | Log out the current user.                    | Yes       |
| `/register`  | POST   | Register a new user.                         | No        |
| `/check_login` | GET   | Check login status of the current user.      | Yes       |


# Frontend Overview

## MainRoutes Component

The `MainRoutes` component manages the application's routing. It defines both **public** and **protected** routes using `react-router-dom`.

### Route Definitions

| Route                | Component         | Description                                        | Protected |
|----------------------|-------------------|----------------------------------------------------|-----------|
| `/`                  | `Home`            | Displays the home page.                           | No        |
| `/register`          | `RegisterPage`    | User registration page.                           | No        |
| `/login`             | `LoginPage`       | User login page.                                   | No        |
| `/create`            | `CreateEmployee`  | Form to create a new employee.                     | Yes       |
| `/edit/:e_id`        | `EditEmployee`    | Form to edit an existing employee by ID.           | Yes       |
| `/dashboard`         | `Dashboard`       | Displays a dashboard with employee records.        | Yes       |
| `*`                  | Not Found         | Fallback route for undefined pages.               | No        |


