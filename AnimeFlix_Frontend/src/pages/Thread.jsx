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

  const getData = async () => {
    const fetchedThread = await fetchSpecificThreads(id);
    setThread(fetchedThread);
    const fetchPost = await fetchPosts(id);
    setPosts(fetchPost);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleClickReplies = async (postId) => {
    console.log(postId);
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

  return (
    <main className="mx-auto my-4 h-auto w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl text-start">
          <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
            <h3 className="cursor-pointer text-xl font-semibold text-slate-900">
              {thread.title}
            </h3>
            <p className="text-slate-700">{thread.body}</p>
          </div>
          <WritePosts />
          <div className="bg-grid-slate mx-auto my-4 h-auto w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col items-center justify-center py-2"
              >
                <div className="w-full max-w-3xl text-start">
                  <div className="mb-4 rounded-lg bg-slate-600 p-6 shadow-md">
                    <div className="py-4">
                      <h3 className="text-lg font-normal text-slate-100">
                        {post.content}
                      </h3>
                    </div>
                    <div className="py-2">
                      <div className="float-start">
                        <button onClick={() => handleClickReplies(post._id)}>
                          Reply <i className="fas fa-reply"></i>
                        </button>
                      </div>
                      <div className="float-end">
                        <button onClick={() => handleClickReplies(post._id)}>
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
                    <WriteComments postId={post._id} />
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
                            <div className="">{reply.content}</div>
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
