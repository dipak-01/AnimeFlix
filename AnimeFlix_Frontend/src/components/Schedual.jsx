import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
const LiveShowTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
};
function formatDateToReadable(dateString) {
  const date = new Date(dateString);
  return format(date, "do MMMM EEEE");
}

const getSchedual = async (date) => {
  try {
    const url = `${import.meta.env.VITE_ANIME_URL}/anime/schedule?date=${date}`;
    const response = await axios.get(url);
    const results = response.data.scheduledAnimes;
    return results;
  } catch (error) {
    console.error("Error in fetching schedual:", error);
    return null;
  }
};

const DrawerNavigation = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/anime/info?id=${encodeURIComponent(id)}`);
    window.location.reload();
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);

  // Generate dates
  const today = new Date();
  const dates = [];
  dates.push(formatDate(today));
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(formatDate(nextDate));
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulePromises = dates.map((date) => getSchedual(date));
      const scheduleResults = await Promise.all(schedulePromises);
      const formattedSchedules = dates.map((date, index) => ({
        date,
        schedule: scheduleResults[index],
      }));
      setSchedules(formattedSchedules);
    };

    fetchSchedules();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="text-center">
      <button
        className={`text-lg text-black bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-t-lg  px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 z-40 rotate-90 fixed -left-12 top-1/2 shadow-2xl transition-transform ${
          drawerOpen ? "lg:translate-x-96 translate-x-72" : "translate-x-0"
        } `}
        type="button"
        onClick={toggleDrawer}
      >
        <p className="rotate-180">
          Schedule <i className="fa-solid fa-calendar-days"></i>
        </p>
      </button>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 lg:w-96 w-72 h-screen p-4 mostly-customized-scrollbar overflow-y-auto transition-transform ${
          drawerOpen ? "translate-x-0" : "lg:-translate-x-96 -translate-x-96"
        } dark:bg-gray-950`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-3xl text-start pb-4 font-semibold text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap"
        >
          Schedules{" "}
          <span className="text-xl text-gray-600">
            <LiveShowTime />
          </span>
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div>
          {schedules.map(({ date, schedule }, index) => (
            <div key={index} className="text-start  text-slate-300 pb-4">
              <div className=" font-semibold text-2xl   border-b-2 border-gray-800 py-2 font-mono text-orange-400">
                {formatDateToReadable(date)}
              </div>
              {schedule && schedule.length > 0 ? (
                <div>
                  {schedule.map((item, itemIndex) => (
                    <div className="flex p-1" key={itemIndex}>
                      <div className="text-gray-400 w-1/4 ">{item.time} </div>
                      <div
                        onClick={() => handleClick(item.id)}
                        className="text-gray-600 w-3/4 line-clamp-1 cursor-pointer"
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No schedule available</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerNavigation;
