import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { SiTicktick } from "react-icons/si";
import { SlCalender, SlClock } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData } from "../thunk/thunk";
import { markTaskAsDone, setSelectedTodo } from "../features/todos/todoSlice";
import { showForm } from "../features/form/formSlice";
import { toast } from "react-toastify";

const Cards = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // ------------- H A N D L E - D E L E T E -----------------

  const handleDelete = (id) => {
    dispatch(deleteData(id));
    toast.error("Task Deleted")
  };

  // -------------- H A N D L E - U P D A T E -----------------

  const handleUpdate = (todo) => {
    dispatch(setSelectedTodo(todo));
    dispatch(showForm());
  };
  // ------------ task done -----------------

  const handleTaskDone = (taskId) => {
    dispatch(markTaskAsDone(taskId));

    const taskToUpdate = todos.find((todo) => todo.id === taskId);
    if (taskToUpdate) {
      dispatch(updateData({ ...taskToUpdate, isDone: true }));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-600";
      case "High":
        return "bg-orange-100 text-orange-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Operational":
        return "bg-blue-500";
      case "Technical":
        return "bg-green-500";
      case "Strategic":
        return "bg-purple-500";
      case "Hiring":
        return "bg-orange-500";
      case "Financial":
        return "bg-red-500";
      default:
        return "bg-black";
    }
  };

  const filteredTodos = todos.filter((task) => {
    const matchPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const matchType = typeFilter === "All" || task.taskType === typeFilter;

    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.isDone) ||
      (statusFilter === "Pending" && !task.isDone);

    return matchPriority && matchType && matchStatus;
  });

  return (
    <>
      <section className="p-10 bg-slate-50">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setPriorityFilter("All");
              setTypeFilter("All");
              setStatusFilter("All");
            }}
            className="p-2 px-4 bg-gradient-to-r from-blue-500 to-sky-400 text-sm rounded-md text-white font-medium cursor-pointer"
          >
            Clear All Filters
          </button>

          <div className="flex items-center gap-2">
            <span>Sort By: </span>

          <select
            onChange={(e) => setPriorityFilter(e.target.value)}
            value={priorityFilter}
            className="p-2 rounded-md border border-gray-300 text-sm"
          >
            <option value="All">Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            value={typeFilter}
            className="p-2 rounded-md border border-gray-300 text-sm"
          >
            <option value="All">Types</option>
            <option value="Operational">Operational</option>
            <option value="Technical">Technical</option>
            <option value="Strategic">Strategic</option>
            <option value="Hiring">Hiring</option>
            <option value="Financial">Financial</option>
          </select>
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="p-2 rounded-md border border-gray-300 text-sm"
          >
            <option value="All">Status</option>
            <option value=" Completed">Completed</option>
            <option value=" Pending">Pending</option>
          </select>
          </div>
        </div>

        <div className="task-item max-h-full">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks assigned yet.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTodos.map((task, index) => (
                <li
                  key={index}
                  className={`relative p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <div className="flex flex-col h-full">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                      {task.description}
                    </h2>

                    <div className="flex-grow space-y-2 mt-2 text-sm text-gray-500">
                      <p className="flex items-center font-medium gap-x-2">
                        <SlCalender className="text-gray-800" />
                        <span className="truncate">{task.dueDate}</span>
                      </p>
                      <p className="flex items-center font-medium gap-x-2">
                        <SlClock className="text-gray-800" />
                        <span>{task.estimateTime}</span>
                      </p>
                      <p className="flex items-center gap-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${getTypeColor(
                            task.taskType
                          )}`}
                        ></span>
                        <span className="capitalize">{task.taskType}</span>
                      </p>
                      <p className="flex items-center font-medium gap-x-2">
                        Priority :
                        <span
                          className={` py-0.5 text-sm rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </p>
                      <p className="flex items-center gap-x-2 font-medium">
                        Status:
                        {task.isDone ? (
                          <span className="text-green-600">Completed</span>
                        ) : (
                          <span className="text-amber-500">Pending</span>
                        )}
                      </p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-2 text-red-500 bg-white hover:bg-red-50 rounded-lg shadow-sm"
                        title="Delete Task"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleUpdate(task)}
                        className="p-2 text-blue-500 bg-white hover:bg-blue-50 rounded-lg shadow-sm"
                        title="Edit Task"
                      >
                        <HiMiniPencilSquare />
                      </button>
                      <button
                        onClick={() => handleTaskDone(task.id)}
                        className="p-2 text-green-600 bg-white hover:bg-green-50 rounded-lg shadow-sm"
                        title="Mark as Done"
                      >
                        <SiTicktick />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Cards;
