import { fetchThreads } from "../services/forumService";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import EmojiPicker from "emoji-picker-react";
export default function () {
  const [threads, setThreads] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setIsLoading(true);
    socket.timeout(5000).emit("create-something", message, () => {
      setIsLoading(false);
    });
    setMessage("");
  };
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  // socket.on("message", (data) => {
  //   console.log(data);
  //   setFooEvents((previous) => [...previous, data]);
  // });
  useEffect(() => {
    console.log(socket.connected);
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(message) {
      setFooEvents((previous) => [...previous, message]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  useEffect(() => {}, [fooEvents]);
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
              <ul className="space-y-2">
                {fooEvents.map((event, index) => (
                  <li key={index} className="rounded-lg bg-gray-700 p-2">
                    {event}
                  </li>
                ))}
              </ul>
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
