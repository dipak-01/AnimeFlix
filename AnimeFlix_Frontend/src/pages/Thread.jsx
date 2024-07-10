import { fetchSpecificThreads, fetchPosts } from "../services/forumService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function () {
  const [thread, setThread] = useState([]);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    const fetchedThread = await fetchSpecificThreads(id);
    setThread(fetchedThread);
    const fetchPost = await fetchPosts(id);
    setPosts(fetchPost);
    console.log(posts);
  };
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <>
      <main className="mx-auto my-4  h-auto  w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0  ">
        <div className="flex flex-col items-center justify-center p-4 ">
          <div className="w-full max-w-3xl text-start">
            <div className=" mb-4 rounded-lg bg-white p-6 shadow-md">
              <h3
                onClick={() => handleCLickThread(thread._id)}
                className="cursor-pointer  text-xl font-semibold text-slate-900"
              >
                {thread.title}
              </h3>
              <p className="text-slate-700">{thread.body}</p>
            </div>
            <div className="mx-auto my-4 h-auto w-full max-w-[1420px] px-2 text-start text-slate-50 sm:px-4 lg:px-6 xl:px-0">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col items-center justify-center py-2"
                >
                  <div className="w-full max-w-3xl text-start">
                    <div className="mb-4 rounded-lg bg-slate-600 p-6 shadow-md">
                      <h3 className="text-lg font-normal text-slate-100">
                        {post.content}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
