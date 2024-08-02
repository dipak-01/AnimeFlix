import { fetchThreads } from "../services/forumService";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/slice/userSlice";
import { socket } from "../socket";
import EmojiPicker from "emoji-picker-react";
import shortName from "../services/UniqueNameGenerator";

export default function () {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [data, setData] = useState([]);
  function randomHsl() {
    return "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
  }
  const nameColor = randomHsl();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    if (userData) {
      setData(userData.data);
      console.log(data);
      setLoading(false);
    }
  }, [userData]);
  const [threads, setThreads] = useState([]);
  const [messageColor, setMessageColor] = useState("");
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageLogs, setMessageLogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [typingTimer, setTypingTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [activityMessage, setActivityMessage] = useState();
  const handleSubmitMessage = (e) => {
    setMessageColor(nameColor);
    e.preventDefault();
    setIsLoading(true);
    setActivityMessage("");
    if (message.trim() === "") {
      setEmptyMessage(true);
      setIsLoading(false);
      return;
    }
    socket.timeout(5000).emit("create-something", message, (err) => {
      setIsLoading(false);
      if (err) {
        console.error("Message sending failed", err);
      }
    });
    setMessage("");
  };

  const onTyping = () => {
    socket.emit("activity", shortName);

    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    const timer = setTimeout(() => {
      setActivityMessage("");
      socket.emit("activity", "");
    }, 3000);

    setTypingTimer(timer);
  };

  useEffect(() => {
    function onConnect() {
      socket.emit("user-connected", shortName);
      setIsConnected(true);
    }

    function onDisconnect() {
      socket.emit("user-disconnected", shortName);
      setIsConnected(false);
    }

    function onFooEvent(message) {
      setActivityMessage("");
      setFooEvents((previous) => [...previous, message]);
    }

    function onMessageLogs(message) {
      setActivityMessage("");
      setMessageLogs((previous) => [...previous, message]);
    }

    function onActivity(name) {
      setActivityMessage(name);
    }

    // Emit the username when the user connects
    socket.on("connect", onConnect);

    // Handle socket disconnection
    socket.on("foo", onFooEvent);
    socket.on("logs", onMessageLogs);
    socket.on("disconnect", onDisconnect);
    socket.on("activity", onActivity);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
      socket.off("logs", onMessageLogs);
      socket.off("activity", onActivity);
    };
  }, []);

  useEffect(() => {}, [fooEvents]);
  useEffect(() => {}, [messageLogs]);

  const getData = async () => {
    const fetchedThreads = await fetchThreads();
    setThreads(fetchedThreads);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleCLickThread = (threadId) => {
    navigate(`/community/thread/${encodeURIComponent(threadId)}`);
  };

  return (
    <>
      <main className="  mx-auto my-4 h-auto min-h-screen  w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="mb-4 w-full max-w-3xl rounded-lg bg-gray-800 shadow-md">
            <header className="rounded-t-lg bg-gray-900 p-4 text-white">
              <h1 className="text-xl font-bold">Live Chat</h1>
            </header>
            <div className="relative h-96 overflow-y-auto p-4">
              {/* <div className="absolute top-1/2 left-1/2 text-3xl font-semibold">
                Yōkoso Minasan
              </div> */}

              <div className="flex w-full flex-col justify-end space-y-2">
                {fooEvents.map((event, index) => (
                  <>
                    <div className="flex items-center ">
                      {data && (
                        <>
                          <div className=" mx-3 w-1/12">
                            <img
                              className="h-10 w-10  rounded-full border "
                              src={data.avatarUrl}
                              alt={data.username}
                            />
                          </div>
                          <div
                            key={index}
                            className="w-11/12 rounded-lg bg-gray-700  p-4   "
                          >
                            <div className="my-1 text-xs text-orange-400">
                              {data.username}
                            </div>
                            {event}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ))}
                <div className=" mx-auto">
                  {messageLogs.map((log, index) => (
                    <div className="" key={index}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
              {activityMessage && (
                <p className="py-2 text-sm italic">
                  <span style={{ color: nameColor }} className="">
                    {" "}
                    {activityMessage}{" "}
                  </span>{" "}
                  is typing...
                </p>
              )}
            </div>
            <form
              onSubmit={handleSubmitMessage}
              className="relative flex rounded-b-lg bg-gray-900 p-4"
            >
              <input
                className="min-w-8 flex-grow rounded-l-lg bg-gray-700 p-2 text-white focus:outline-none"
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                name="message"
                value={message}
                id="message"
                onKeyDown={onTyping}
                placeholder="Type your message..."
              />
              {/* <EmojiPicker className="absolute" allowExpandReactions={true}  emojiStyle="" open={true} /> */}
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-r-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
          <div className="w-full max-w-3xl text-start">
            <p className="mb-4 text-3xl text-slate-50">Threads</p>
          </div>
          <div className="w-full max-w-3xl text-start">
            {loading ? (
              // Skeleton loader
              <div className="animate-pulse">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="mb-4  h-24 w-full rounded bg-slate-700  "
                  ></div>
                ))}
              </div>
            ) : (
              threads.map((thread, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg bg-white p-6 shadow-md"
                >
                  <h3
                    onClick={() => handleCLickThread(thread._id)}
                    className="cursor-pointer  text-xl font-semibold text-slate-900"
                  >
                    {thread.title}
                  </h3>
                  <p className="text-slate-700">{thread.body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
