# Task Management System

This is a simple Task Management System built with React, Redux Toolkit, and Firebase for the backend. It allows users to create, read, update, and delete tasks, with features like task filtering, sorting, and status tracking.

## Demo

You can see a live demo of the application here: [https://task-management-system-nine.vercel.app/](https://task-management-system-nine.vercel.app/)

## Features

*   **Task Creation:** Easily add new tasks with descriptions, due dates, estimated times, types, and priorities.
*   **Task Management:**
    *   **View Modes:** Switch between a card view and a table view for tasks.
    *   **Filtering:** Filter tasks by priority, type, and status (Completed/Pending).
    *   **Searching:** Search tasks by description or type in the table view.
    *   **Editing:** Update existing task details.
    *   **Deletion:** Delete individual tasks or multiple selected tasks.
    *   **Mark as Done:** Mark tasks as completed.
*   **Dashboard Overview:** Get a quick summary of total tasks, in-progress tasks, completed tasks, and pending tasks.
*   **Responsive Design:** The application is designed to be responsive and work well on various screen sizes.
*   **Notifications:** Toast notifications provide feedback for actions like task creation, update, and deletion.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development.
*   **React Router DOM:** For declarative routing in React applications.
*   **Firebase:** Used as the backend database (Realtime Database) for storing task data.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **React Icons:** A library for popular icons.
*   **React Toastify:** For adding toast notifications.
*   **React Data Table Component:** A component for building customizable and interactive data tables.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

## Installation and Setup

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new Firebase project.
3.  In your project, navigate to "Build" > "Realtime Database" and create a new database.
4.  Go to "Project settings" (the gear icon next to "Project overview").
5.  Under "Your apps," add a new web app.
6.  Copy your Firebase configuration.

### 4. Create a `.env` file

In the root of your project, create a file named `.env` and add your Firebase configuration details:

```
VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_FIREBASE_DATABASE_URL="YOUR_DATABASE_URL"
VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_APP_ID"
```

**Note:** The `VITE_` prefix is important for Vite to expose these environment variables to your client-side code. Ensure your `VITE_FIREBASE_DATABASE_URL` points to the base URL of your Realtime Database, including the `https://` prefix and ending with `.firebaseio.com`. The `axiosApi.js` file appends `/todoList` to this base URL.

### 5. Run the application

```bash
npm run dev
# or
yarn dev
```

The application will open in your browser, usually at `http://localhost:5173`.

## Project Structure

*   **`/src`**: Contains all the source code.
    *   **`/src/app`**: Redux store configuration.
    *   **`/src/axios`**: Axios instance for API calls.
    *   **`/src/components`**: Reusable React components (e.g., `Cards`, `Form`, `TaskTable`).
    *   **`/src/features`**: Redux slices for managing state (e.g., `formSlice`, `todoSlice`).
    *   **`/src/firebase`**: Firebase initialization.
    *   **`/src/pages`**: Main application pages (e.g., `DashBoard`).
    *   **`/src/thunk`**: Redux Thunks for asynchronous operations (API calls).
    *   **`App.jsx`**: Main application component and routing setup.
    *   **`main.jsx`**: Entry point of the React application.

## Usage

1.  **Dashboard:** Upon opening the application, you'll see a dashboard with a greeting, current date, and a summary of your tasks.
2.  **Create Task:** Click the "Create Task" button to open a form where you can input task details.
3.  **View Tasks:**
    *   **Card View:** The default view displays tasks as cards, allowing for quick filtering.
    *   **Table View:** Click "Table View" in the Quick Actions section to see tasks in a sortable and searchable table.
4.  **Edit Task:** Click the pencil icon on a task card or in the table to open the form pre-filled with the task's data for editing.
5.  **Delete Task:** Click the trash can icon to delete a task. In the table view, you can select multiple rows and delete them all at once.
6.  **Mark as Done:** Click the tick icon to mark a task as completed. In the table view, you can select multiple rows and mark them as done.
7.  **Filtering (Card View):** Use the dropdowns at the top of the card view to filter tasks by priority, type, or status. Click "Clear All Filters" to reset.
8.  **Searching (Table View):** Use the search bar above the table to filter tasks by description or type.

## Contributing

Feel free to fork the repository and contribute!

## License

This project is open source and available under the [MIT License](LICENSE).
