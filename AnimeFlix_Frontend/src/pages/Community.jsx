import { fetchThreads } from "../services/forumService";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Chatbox from "../components/Chatbox";

export default function () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState("");
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
         
          <Chatbox />
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
