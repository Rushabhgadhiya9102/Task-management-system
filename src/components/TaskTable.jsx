import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteData, fetchData, updateData } from "../thunk/thunk";
import { markTaskAsDone, setSelectedTodo } from "../features/todos/todoSlice";
import { IoMdDoneAll } from "react-icons/io";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { showForm } from "../features/form/formSlice";
import { SiTicktick } from "react-icons/si";

const TaskTable = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [selectedRow, setSelectedRow] = useState("");

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
        return "text-red-600";
      case "High":
        return "text-orange-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-blue-600";
      case "Lowest":
        return "text-gray-600";
      default:
        return "text-black";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Operational":
        return "text-blue-600";
      case "Technical":
        return "text-green-600";
      case "Strategic":
        return "text-purple-600";
      case "Hiring":
        return "text-orange-600";
      case "Financial":
        return "text-red-600";
      default:
        return "text-black";
    }
  };

  // ------------- table columns --------------

  const columns = [
    {
      name: "Task",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.isDone ? (
          <span className="text-green-500 font-semibold">Completed</span>
        ) : (
          <span className="text-red-500 font-semibold">Pending</span>
        ),
      sortable: true,
    },
    {
      name: "Estimate Date/Time",
      selector: (row) => `${row.dueDate} at ${row.estimateTime}`,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => <span className={getTypeColor(row.taskType)}>{row.taskType}</span>,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => (
        <span className={getPriorityColor(row.priority)}>{row.priority}</span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg cursor-pointer"
            onClick={() => handleDelete(row.id)}
          >
            <FaTrash size={15} />
          </button>
          <button
            className="p-1.5 text-indigo-500 hover:bg-indigo-100 rounded-lg cursor-pointer"
            onClick={() => handleUpdate(row)}
          >
            <HiMiniPencilSquare size={15} />
          </button>
          <button
            className="p-1.5 text-green-500 hover:bg-green-100 rounded-lg cursor-pointer"
            onClick={() => handleTaskDone(row.id)}
          >
            <SiTicktick size={15} />
          </button>
        </>
      ),
      sortable: true,
    },
  ];

  //   ---------- table style and data -----------------

  const customStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        color: "black",
      },
    },
    cells: {
      style: {
        color: "black",
        fontSize: "14px",
        fontWeight:""
      },
    },
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#F0F9FF",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "white",
        }
      },
    },
  };

  return (
    <>
      <section className="datable px-10 py-5">
        <DataTable
          columns={columns}
          data={todos}
          customStyles={customStyle}
          pagination
          selectableRows
          highlightOnHover
          pointerOnHover
          responsive
          scrollable={true}
          onSelectedRowsChange={(e) => {
            setSelectedRow(e.selectedRows);
          }}
        />

        <button
          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg cursor-pointer"
          onClick={() => {
            selectedRow.map((row) => handleDelete(row.id));
            setSelectedRow("");
          }}
        >
          <FaTrash size={20} />
        </button>
        <button
          className="p-1.5 text-green-500 hover:bg-green-100 rounded-lg cursor-pointer"
          onClick={() => {
            selectedRow.map((row) => handleTaskDone(row.id));
            setSelectedRow("");
          }}
        >
          <SiTicktick size={20} />
        </button>
      </section>
    </>
  );
};

export default TaskTable;
