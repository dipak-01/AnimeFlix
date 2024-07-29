import {
  fetchSpecificThreads,
  fetchPosts,
  fetchReplies,
} from "../services/forumService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WriteComments, WritePosts } from "../components/ForumForms";

export default function () {
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState({});
  const [toggleReplies, setToggleReplies] = useState({});
  const { id } = useParams();
  const getPost = async () => {
    const fetchedThread = await fetchSpecificThreads(id);
    setThread(fetchedThread);
    const fetchPost = await fetchPosts(id);

    setPosts(fetchPost);
  };
  useEffect(() => {
    getPost();
    // const intervalId = setInterval(getPost, 5000);
    // return () => clearInterval(intervalId);
  }, [id]);
  const handlePostSubmit = async () => {
    try {
      const fetchPost = await fetchPosts(id);
      setPosts(fetchPost);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };
  // const handleCommentSubmit = async () => {
  //   try {
  //     const fetchPost = await fetchPosts(id);
  //     setPosts(fetchPost);
  //   } catch (error) {
  //     console.error("Failed to fetch posts:", error);
  //   }
  // };

  const handleAddReplies = async (postId) => {
    setToggleReplies((prevToggle) => ({
      ...prevToggle,
      [postId]: !prevToggle[postId],
    }));

    if (!toggleReplies[postId]) {
      try {
        const fetchedReplies = await fetchReplies(postId);
        setReplies((prevReplies) => ({
          ...prevReplies,
          [postId]: fetchedReplies,
        }));
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
  };
  const handleSubmitReply = async (postId) => {
    try {
      handleAddReplies(postId);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  const timeDifference = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInMs = now - postDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInMinutes} minutes ago`;
    }
  };
  return (
    <main className="mx-auto my-4 min-h-screen h-auto w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl text-start">
          <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
            <h3 className="cursor-pointer text-xl font-semibold text-slate-900">
              {thread.title}
            </h3>
            <p className="text-slate-700">{thread.body}</p>
          </div>
          <WritePosts onPostSubmit={handlePostSubmit} />
          <div className="bg-grid-slate mx-auto my-4 h-auto w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col items-center justify-center py-2"
              >
                <div className="w-full max-w-3xl text-start">
                  <div className="mb-4 rounded-lg bg-slate-600 p-6 shadow-md">
                    <div className="flex items-center">
                      {" "}
                      <img
                        className="h-10 w-10 rounded-full border-slate-900"
                        src={post.userId.avatarUrl}
                        alt={post.userId.username}
                      />
                      <span className="px-4 italic text-teal-100">
                        {" "}
                        {post.userId.username}
                      </span>
                      <span className="text-sm ">
                        {" "}
                        {timeDifference(post.createdAt)}{" "}
                      </span>
                    </div>
                    <div className="py-4">
                      <h3 className="text-lg font-normal text-slate-100">
                        {post.content}
                      </h3>
                    </div>
                    <div className="py-2">
                      <div className="float-start">
                        <button onClick={() => handleAddReplies(post._id)}>
                          Reply <i className="fas fa-reply"></i>
                        </button>
                      </div>
                      <div className="float-end">
                        <button onClick={() => handleAddReplies(post._id)}>
                          {toggleReplies[post._id]
                            ? "Hide Replies"
                            : "Show Replies"}{" "}
                          <i className="fas fa-comment"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {toggleReplies[post._id] && (
                  <div className="float-end flex w-full flex-col items-center justify-end">
                    <WriteComments
                      postId={post._id}
                      onCommentSubmit={handleSubmitReply}
                    />
                    {replies[post._id] && replies[post._id].length > 0 ? (
                      replies[post._id].map((reply) => (
                        <div className="mb-2   mt-1  w-11/12 place-self-end rounded-md bg-transparent p-0">
                          <div
                            key={reply._id}
                            className="   p-2 text-start"
                            style={{
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                            }}
                          >
                            <div className="flex items-center rounded-md border border-slate-900 bg-slate-400/40 backdrop-blur-lg shadow-lg ring-1 ring-black/5 py-3">
                              <img
                                className="mx-5 h-8 w-8 rounded-full "
                                src={reply.userId.avatarUrl}
                                alt={reply.userId.username}
                              />

                              <div className="">
                                <p className="text-xs italic">
                                  {reply.userId.username} 
                                  <span className="text-orange-300">{" "}
                                  {timeDifference(reply.createdAt)}{" "}</span>
                                </p>
                                <p>{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No replies yet</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
