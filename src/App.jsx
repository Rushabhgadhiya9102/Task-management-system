import React from "react";
import DashBoard from "./pages/DashBoard";
import Cards from "./components/Cards";
import TaskTable from "./components/TaskTable";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <DashBoard />
      <Routes>
        <Route path="/" element={<TaskTable />} />
        <Route path="/Cards" element={<Cards />} />
      </Routes>
    </>
  );
};

export default App;
