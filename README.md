# Task Manager App
A full-stack Task Manager application built with **React (TypeScript)** and **Express (TypeScript)**.

## Prerequisites
Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://git-scm.com/)

## Getting Started
1. Clone the repository:
   ```sh
   git clone https://github.com/AliReda2/task-manager-app.git
   cd task-manager-app
   ```

---

## Backend Setup (Express + TypeScript)
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the backend server:
   ```sh
   npm run dev
   ```
4. The API will be available at: **`http://localhost:5000/`**

---

## Frontend Setup (React + TypeScript)
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the frontend development server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser at: **`http://localhost:5173/`**

---

## API Endpoints
| Method | Endpoint       | Description       |
|--------|--------------|------------------|
| GET    | `/tasks`     | Fetch all tasks  |
| POST   | `/tasks`     | Add a new task   |
| PUT    | `/tasks/:id` | Update a task    |
| DELETE | `/tasks/:id` | Delete a task    |

---

## Assumptions & Notes
- The project currently stores data in a **MongoDB database**.
- Ensure that both the **frontend** and **backend** servers are running simultaneously for the app to work correctly.

---
