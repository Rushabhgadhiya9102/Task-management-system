import React, { useEffect, useState } from "react";
import { FaPlus, FaTable } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import { showForm } from "../features/form/formSlice";
import { Link, useNavigate } from "react-router-dom";
import { HiSquare2Stack } from "react-icons/hi2";

const DashBoard = () => {
  const [greetings, setGreetings] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const hideForm = useSelector((state) => state.form.show);
  const navigate = useNavigate();

  //   ------------- S E T - C U R R E N T - D A T E - A N D - D A Y -----------------

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const options = { year: "numeric", month: "long", day: "numeric" };

    if (hours < 12) {
      setGreetings("Good Morning");
    } else if (hours > 12 && hours < 16) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Evening");
    }

    setCurrentDay(date.toLocaleString("en-US", { weekday: "long" }));
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  return (
    <>
      <main>
        <section className="banner-section p-10 bg-slate-50">
          <div className="grid grid-cols-3 gap-3">
            <div className="banner-item">
              <div className="h-full bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <h2 className="text-4xl font-bold text-white">
                  {greetings} Rushabh
                </h2>
                <p className="text-xl text-white/90 font-semibold mt-2">
                  {currentDay}
                </p>
                <p className="text-xl text-white/80 font-semibold">
                  {currentDate}
                </p>
              </div>
            </div>
            <div className="banner-item">
              <div className="quick-selection">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    Quick Actions
                  </h2>
                  <div>
                    <Link to={"/TaskTable"}>
                      <button className="w-full flex items-center justify-between p-3 mb-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                        <span>Table View</span>
                        <FaTable />
                      </button>
                    </Link>
                    <Link to={"/"}>
                      <button
                        className="w-full flex items-center justify-between p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <span>Card View</span>
                        <HiSquare2Stack />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-item">
              <div className="grid grid-cols-2 gap-3 h-full">
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <p className="text-sm text-gray-500">Tasks</p>
                  <p className="text-2xl font-bold">{todos.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {todos.filter((todo) => !todo.isDone).length}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-green-500">
                    {todos.filter((todo) => todo.isDone).length}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-red-500">
                    {todos.filter((todo) => !todo.isDone).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-between items-center px-10 pb-5 bg-slate-50">
          <div className="title">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 text-transparent bg-clip-text">
              Task List
            </h2>
          </div>

          <div className="add-task">
            <button
              onClick={() => dispatch(showForm())}
              className="flex items-center gap-x-2 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold py-2 px-5 rounded-lg cursor-pointer"
            >
              Create Task <FaPlus />
            </button>
          </div>
        </section>

        {hideForm && <Form />}
      </main>
    </>
  );
};

export default DashBoard;
