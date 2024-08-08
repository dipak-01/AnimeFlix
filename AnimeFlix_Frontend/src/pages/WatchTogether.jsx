import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
export default function () {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = location.state || {};
  console.log(data);
  const [selectedOption, setSelectedOption] = useState("");
  const [roomName, setRoomName] = useState("");
  const [time, setTime] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = (id, time, date) => {
    console.log(id, time, date);
    navigate(`/watchtogether/${id}`, {
      state: { data: { time, date } },
    });
  };
  return (
    <>
      <main className="mx-auto my-4  h-auto min-h-screen w-full max-w-[1420px] items-center px-2 text-start text-white sm:px-4 lg:px-20 xl:px-20">
        <div className="py-4 text-2xl font-semibold lg:text-4xl ">
          {" "}
          Create a new Room{" "}
        </div>
        <div className="flex flex-col border-zinc-800 bg-zinc-950 lg:flex-row">
          <div className="lg:w-1/3">
            <div className="     m-4 object-cover">
              <img
                className="  h-auto w-40 rounded-lg"
                src={data.poster}
                alt=""
              />
            </div>{" "}
            <div className="mx-4 text-xl font-medium text-orange-400">
              {data.name}
            </div>
            <div className="block   align-middle text-slate-900">
              <div className="data flex py-2 text-xs  font-semibold ">
                <div className=" ml-4 flex text-start">
                  <p className="rounded-s-sm border border-slate-900 bg-orange-300 px-1">
                    {data.stats.rating}
                  </p>
                  <p className="border border-slate-900 bg-orange-100 px-1">
                    <i className="far fa-clock"></i> {data.stats.duration}
                  </p>
                  <p className="border border-slate-900 bg-orange-300 px-1">
                    <i className="fas fa-tv"></i> {data.stats.type}
                  </p>
                  <p className="rounded-e-sm border border-slate-900 bg-orange-100 px-1">
                    {data.stats.quality}
                  </p>

                  <p className="w-fit whitespace-normal text-nowrap rounded-s-sm border border-slate-900 bg-orange-300 px-1">
                    <i className="far fa-closed-captioning"></i>{" "}
                    {data.stats.episodes.sub}
                  </p>
                  {data.stats.episodes.dub && (
                    <p className="w-fit rounded-e-sm border border-slate-900 bg-orange-100 px-1">
                      <i className="fas fa-microphone"></i>{" "}
                      {data.stats.episodes.dub}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="m-4  line-clamp-3 overflow-hidden text-balance ">
              {data.description}{" "}
            </div>
          </div>
          <div className="bg-slate-950 p-4 lg:w-1/3">
            <div className="my-0 text-xl">
              {" "}
              <i className="fa fa-house px-2 text-sm "></i>Room Name
            </div>
            <div>
              <div>
                <input
                  type="text"
                  id="first_name"
                  className="my-8 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder=""
                  required
                  // value={roomName}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                  defaultValue={data.name}
                />
              </div>
              <p>You can change the room name or leave it as default</p>
            </div>
          </div>
          <div className="bg-stone-950 p-4 lg:w-1/3">
            <div className="flex justify-around">
              <div className="  flex   items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  placeholder="schedual"
                  name="default-radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  onChange={(e) => setSelectedOption(e.target.placeholder)}
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Schedual Room
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultChecked
                  id="default-radio-2"
                  type="radio"
                  placeholder="start_now"
                  name="default-radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  onChange={(e) => setSelectedOption(e.target.placeholder)}
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Start Now
                </label>
              </div>
            </div>
            <div className="my-8 flex"></div>
            {selectedOption === "schedual" ? (
              <p className="pt-8">
                Room will automatically start at your schedualed time and date.
              </p>
            ) : (
              <p className="pt-8">
                You will get a link from which you can start the stream at any
                time.
              </p>
            )}
            {selectedOption === "schedual" ? (
              <div>
                <form onSubmit={() => handleSubmit(data.id, time, date)}>
                  <div className="relative my-8 max-w-sm">
                    <label
                      htmlFor="time"
                      className="text-md mb-2 block font-medium text-gray-900 dark:text-white"
                    >
                      Select date:
                    </label>
                    <input
                      id="default-datepicker"
                      type="date"
                      required
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Select date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      htmlFor="time"
                      className="text-md mb-2 block font-medium text-gray-900 dark:text-white"
                    >
                      Select time:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="time"
                        id="time"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-8 flex">
                    <button
                      type="submit"
                      className="mb-2 me-2 w-2/3 rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                      Create Room
                    </button>
                    <button
                      type="submit"
                      className="mb-2 me-2 w-1/3 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="my-8 flex">
                <button
                  onClick={() => handleSubmit(data.id, time, date)}
                  className="mb-2 me-2 w-2/3 rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                >
                  Create Room
                </button>
                <button
                  type="button"
                  className="mb-2 me-2 w-1/3 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
