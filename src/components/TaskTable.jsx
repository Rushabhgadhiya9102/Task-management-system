import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteData, fetchData, updateData } from "../thunk/thunk";
import { markTaskAsDone, setSelectedTodo } from "../features/todos/todoSlice";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { showForm } from "../features/form/formSlice";
import { SiTicktick } from "react-icons/si";
import { toast } from "react-toastify";

const TaskTable = () => {

  // -------------- S T A T E S - A N D - S E L E C T O R S ----------------

  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [selectedRow, setSelectedRow] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const searchRef = useRef();

  // ---------------- U S E - E F F E C T ----------------

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // ------------- H A N D L E - D E L E T E -----------------

  const handleDelete = (id) => {
    dispatch(deleteData(id));
    toast.error('Task Delete')
  };

  // -------------- H A N D L E - U P D A T E -----------------

  const handleUpdate = (todo) => {
    dispatch(setSelectedTodo(todo));
    dispatch(showForm());
  };
  // ------------ H A N D L E - T A S K - D O N E -----------------

  const handleTaskDone = (taskId) => {
    dispatch(markTaskAsDone(taskId));

    const taskToUpdate = todos.find((todo) => todo.id === taskId);
    if (taskToUpdate) {
      dispatch(updateData({ ...taskToUpdate, isDone: true }));
    }
    toast.success("Task Completed")
  };

  // ------------ C O L O R - C H A N G E - O N - P R I O R I T Y ----------------

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

  // ----------- C O L O R - C H A N G E - O N - T A S K - S T A T U S ----------------

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

  // ------------- T A B L E - C O L U M N S --------------

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
      selector: (row) => (
        <span className={getTypeColor(row.taskType)}>{row.taskType}</span>
      ),
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

  //   ---------- T A B L E - C U S T O M - S T Y L E S -----------------

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
      },
    },
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#F0F9FF",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "white",
        },
        padding:"30px 0px"
      },
    },
  };

  // ---------------- S E A R C H ---------------------

  const taskSearch = todos.filter(
    (item) =>
      item.description?.toLowerCase()?.includes(textFilter.toLowerCase()) ||
      item.taskType?.toLowerCase()?.includes(textFilter.toLowerCase())
  );

  return (
    <>
      <section className="datable px-10 py-5 bg-sky-50">
        <div className="p-5 bg-white rounded-2xl">

          {/* ---------- S E A R C H - B A R ---------- */}

          <div className="flex mb-5"> 
            <input
            type="search"
            placeholder="search"
            onChange={(e) => setTextFilter(e.target.value)}
            value={textFilter}
            ref={searchRef}
            className="border border-gray-300 py-1 px-2 rounded-full w-100 mx-auto"
          />
          </div>

          {/* ------------ D A T A - T A B L E ------------ */}

          <DataTable
            columns={columns}
            data={taskSearch}
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

            {/* --------- D A T A - T A B L E - F O O T E R ---------- */}

          <button
            className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg cursor-pointer"
            onClick={() => {
              selectedRow.map((row) => handleDelete(row.id));
              setSelectedRow("");
              selectedRow("");
            }}
          >
            <FaTrash size={20} />
          </button>
          <button
            className="p-1.5 text-green-500 hover:bg-green-100 rounded-lg cursor-pointer"
            onClick={() => {
              selectedRow.map((row) => handleTaskDone(row.id));
              setSelectedRow("");
              selectedRow("");
            }}
          >
            <SiTicktick size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default TaskTable;
