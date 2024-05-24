import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const optionsDate = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      setTime(now.toLocaleTimeString("en-US", optionsTime));
      setDate(now.toLocaleDateString("en-US", optionsDate));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-8 lg:pt-6 lg:pb-14">
      {/* Mobile Navigation Button */}
      <div className="lg:hidden flex justify-end items-center mr-4">
        <button
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </button>
      </div>

      <div className="container mx-auto lg:relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0">
        <div className="flex flex-col justify-center lg:justify-normal items-center">
          <img
            src="./src/assets/LOGO 1.png"
            className="max-w-32 max-h-32 lamok-box"
            alt="logo"
          />
        </div>

        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 lg:gap-y-10">
          <div className="flex justify-center sm:justify-center items-center">
            <div className="text-4xl text-center cutive-mono-regular">
              Implementation of Mosquito Ovicidal Larvicidal (OL) Trap System
              using Image Analysis
            </div>
          </div>
        </div>

        {/* Mobile Navigation Content */}
        <nav className={`w-full lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col items-center gap-y-4 p-4 rounded-[10px] bg-slate-100">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 pr-4 text-xl cutive-mono-regular"
                    : "text-secondary pr-4 text-xl cutive-mono-regular"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 pr-4 text-xl cutive-mono-regular"
                    : "text-secondary pr-4 text-xl cutive-mono-regular"
                }
              >
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-500 pr-4 text-xl cutive-mono-regular"
                    : "text-secondary pr-4 text-xl cutive-mono-regular"
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="container mx-auto lg:relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0"></div>
      <nav className="bg-white mx-auto max-w-screen-xl left-0 shadow-custom1 h-20 rounded-[10px] hidden lg:flex lg:items-center lg:justify-between lg:px-[50px]">
        <ul className="flex gap-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-r pr-4 text-xl cutive-mono-regular"
                  : "text-secondary border-r pr-4 text-xl  cutive-mono-regular"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 border-r pr-4 text-xl cutive-mono-regular"
                  : "text-secondary border-r pr-4 text-xl cutive-mono-regular"
              }
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 border-r pr-4 text-xl cutive-mono-regular"
                  : "text-secondary border-r pr-4 text-xl cutive-mono-regular"
              }
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className="box">
          <p className="text-red-600 font-bold text-center my-0 leading-none">
            Philippines Standard Time
          </p>
          <p className="text-red-600 font-bold text-center my-0 leading-none">
            {time}
          </p>
          <p className="text-red-600 text-center my-0 leading-none text-sm">
            {date}
          </p>
        </div>
      </nav>
    </div>
  );
}
