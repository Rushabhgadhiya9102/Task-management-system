import React from "react";
import DashBoard from "./pages/DashBoard";
import Cards from "./components/Cards";
import TaskTable from "./components/TaskTable";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <DashBoard />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/TaskTable" element={<TaskTable />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </>
  );
};

export default App;
