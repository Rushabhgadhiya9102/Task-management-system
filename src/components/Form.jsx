import React, { useEffect, useState } from "react";
import { createData, updateData } from "../thunk/thunk";
import { clearSelectedTodo } from "../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideForm } from "../features/form/formSlice";
import { toast } from "react-toastify";
import { RxCrossCircled } from "react-icons/rx";

const Form = () => {

  // ------------- S T A T E S - A N D - S E L E C T O R S ----------------

  const [todoData, setTodoData] = useState({});
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const dispatch = useDispatch()

  // ------------- U S E - E F F E C T ----------------

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
      toast.info("Task Update")
    } else {
      dispatch(createData(todoData));
      toast.success("Task Created");
    }
    console.log(todoData);
    setTodoData({});
    dispatch(hideForm())
    dispatch(clearSelectedTodo());
  };

  // ------------- H A N D L E - C A N C L E -------------

  const handleCancle = ()=>{
    setTodoData({})
    dispatch(hideForm())
  }

  return (
    <>
      <section className="form px-10 bg-slate-50">
        <form method="post">
          <div className="pb-3 flex gap-x-2">

            {/* ----------- T A S K - D E S C R I P T I O N ---------- */}
            <textarea
              type="text"
              placeholder="Task Title"
              className="border border-gray-300 bg-white py-1 px-2 rounded-lg h-9 w-full"
              name="description"
              onChange={handleChange}
              value={todoData.description || ""}
            />

            {/* ----------- T A S K - D U E - D A T E ---------- */}
            <div className="space-x-2 flex">
              <input
                type="date"
                className="border border-gray-300 bg-white py-1 px-2 rounded-lg"
                name="dueDate"
                onChange={handleChange}
                value={todoData.dueDate || ""}
              />

              {/* --------- T A S K - T I M E ---------- */}
              <input
                type="time"
                className="border border-gray-300 bg-white py-1 px-2 rounded-lg"
                name="estimateTime"
                onChange={handleChange}
                value={todoData.estimateTime || ""}
              />

              {/* --------- T A S K - T Y P E ---------- */}
              <select
                name="taskType"
                id="taskType"
                className="border border-gray-300 bg-white py-1 px-2 rounded-lg"
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

              {/* --------- T A S K - P R I O R I T Y ---------- */}
              <select
                name="priority"
                id="priority"
                className="border border-gray-300 bg-white py-1 px-2 rounded-lg"
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

            {/* ---------- S U B M I T ---------- */}
            <button
              disabled={
                !todoData.description ||
                !todoData.dueDate ||
                !todoData.estimateTime ||
                !todoData.taskType ||
                !todoData.priority
              }
              onClick={handleSubmit}
              className={`py-1 px-3 bg-gradient-to-r rounded-lg text-white cursor-pointer ${
                selectedTodo
                  ? "from-green-600 to to-emerald-400"
                  : "from-blue-500 to-sky-400"
              }`}
            >
              {selectedTodo ? "Update" : "Save"}
            </button>

            {/* ---------- C A N C E L ---------- */}
            <button
              onClick={handleCancle}
              className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
            >
              <RxCrossCircled size={20} />
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
