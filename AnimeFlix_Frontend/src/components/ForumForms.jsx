import { useState } from "react";
import { createPost, createReply } from "../services/forumService";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

export function WriteComments(postId) {
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postId.postId, data);
    // Assuming createReply is an async operation
    try {
      await createReply(postId.postId, data);
      setData(""); // Reset data after successful reply creation
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  };
  return (
    <>
      <form className="w-full">
        <div className="mb-4 w-full rounded-lg    bg-transparent">
          <div className="rounded-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only text-xl">
              Your reply
            </label>
            <textarea
              id="comment"
              rows="2"
              className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
            ></textarea>
          </div>
          <div className="dark:border-gray-60 flex items-center justify-between  bg-transparent px-3 py-2">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm   font-semibold text-slate-800 hover:bg-orange-800 focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900"
            >
              Post reply
            </button>
            <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
              Remember, contributions to this topic should follow our{" "}
              <a
                href="#"
                className="text-orange-600 hover:underline dark:text-orange-500"
              >
                Community Guidelines
              </a>
              .
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export function WritePosts() {
  const [data, setData] = useState();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(id, data);
      setData("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
          >
            Your Post
          </label>
          <textarea
            value={data}
            id="message"
            rows="4"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500"
            placeholder="Write your thoughts here..."
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        </div>
        <div className="dark:border-gray-60 flex items-center justify-between   bg-transparent px-3 py-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm   font-semibold text-slate-800 hover:bg-orange-800 focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900"
          >
            Add your Post
          </button>
          <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              className="text-orange-600 hover:underline dark:text-orange-500"
            >
              Community Guidelines
            </a>
            .
          </p>
        </div>
      </form>
    </>
  );
}
