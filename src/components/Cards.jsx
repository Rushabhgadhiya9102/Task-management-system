import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { SiTicktick } from "react-icons/si";
import { SlCalender, SlClock } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData } from "../thunk/thunk";
import { markTaskAsDone, setSelectedTodo } from "../features/todos/todoSlice";

const Cards = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // ------------- H A N D L E - D E L E T E -----------------

  const handleDelete = (id) => {
    dispatch(deleteData(id));
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
  return (
    <>
      <section className="p-10">
        <div className="task-item max-h-full">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks assigned yet.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {todos.map((task, index) => (
                <li
                  key={index}
                  className={`relative p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group ${getPriorityColor(
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
                        onClick={() => handleUpdate(task.id)}
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
