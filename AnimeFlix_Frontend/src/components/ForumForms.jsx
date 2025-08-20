import { useState } from "react";
import { createPost, createReply } from "../services/forumService";
import { useParams } from "react-router-dom";
 

export function WriteComments(postId,{onCommentSubmit}) {
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      await createReply(postId.postId, data);
      setData("");  
      if (onCommentSubmit) {
        onCommentSubmit();
      }
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  };
  return (
    <form className="mx-auto w-full max-w-2xl">
      <div className="mb-4 w-full rounded-xl bg-white p-4 shadow dark:bg-gray-800">
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Your reply
        </label>
        <textarea
          id="comment"
          rows="3"
          className="w-full rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          required
          value={data}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-900"
          >
            Post
          </button>
          <p className="hidden text-xs text-gray-500 lg:block dark:text-gray-400">
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
  );
}

export function WritePosts({onPostSubmit}) {
  const [data, setData] = useState();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(id, data);
      setData("");
      if (onPostSubmit) {
        onPostSubmit();
      }
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
             Post
          </button>
          <p className="ms-auto text-xs p-2 hidden lg:block  text-gray-500 dark:text-gray-400">
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
