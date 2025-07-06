import React, { useEffect, useState } from "react";
import { createData, updateData } from "../thunk/thunk";
import { clearSelectedTodo } from "../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideForm } from "../features/form/formSlice";

const Form = () => {
  const [todoData, setTodoData] = useState({});
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedTodo) {
      setTodoData(selectedTodo);
    } else {
      setTodoData({});
    }
  }, [selectedTodo]);

  // ------------- H A N D L E - C H A N G E -------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  // ------------- H A N D L E - S U B M I T -------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTodo) {
      dispatch(updateData(todoData));
    } else {
      dispatch(createData(todoData));
    }
    console.log(todoData);
    setTodoData({});
    dispatch(hideForm())
    dispatch(clearSelectedTodo());
  };

  return (
    <>
      <section className="form px-10">
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-3 flex gap-x-3">
            <textarea
              type="text"
              placeholder="Task Title"
              className="border border-gray-200 py-1 px-2 rounded-lg h-9 w-full"
              name="description"
              onChange={handleChange}
              value={todoData.description || ""}
            />

            <div className="space-x-2 flex">
              <input
                type="date"
                className="border border-gray-200 py-1 px-2 rounded-lg"
                name="dueDate"
                onChange={handleChange}
                value={todoData.dueDate || ""}
              />

              <input
                type="time"
                className="border border-gray-200 py-1 px-2 rounded-lg"
                name="estimateTime"
                onChange={handleChange}
                value={todoData.estimateTime || ""}
              />

              <select
                name="taskType"
                id="taskType"
                className="border border-gray-200 py-1 px-2 rounded-lg"
                onChange={handleChange}
                value={todoData.taskType || ""}
              >
                <option value="none">Select Type</option>
                <option value="Operational">Operational</option>
                <option value="Technical">Technical</option>
                <option value="Strategic">Strategic</option>
                <option value="Hiring">Hiring</option>
                <option value="Financial">Financial</option>
              </select>

              <select
                name="priority"
                id="priority"
                className="border border-gray-200 py-1 px-2 rounded-lg"
                onChange={handleChange}
                value={todoData.priority || ""}
              >
                <option value="none">Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Lowest">Lowest</option>
              </select>
            </div>
            <button
              disabled={
                !todoData.description ||
                !todoData.dueDate ||
                !todoData.estimateTime ||
                !todoData.taskType ||
                !todoData.priority
              }
              className={`py-1 px-3 bg-gradient-to-r rounded-lg text-white cursor-pointer ${
                selectedTodo
                  ? "from-green-600 to to-emerald-400"
                  : "from-blue-500 to-sky-400"
              }`}
            >
              {selectedTodo ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
