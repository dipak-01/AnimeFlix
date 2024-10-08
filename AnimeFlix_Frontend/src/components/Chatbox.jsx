import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/slice/userSlice";
import { socket } from "../socket";
import EmojiPicker from "emoji-picker-react";
import shortName from "../services/UniqueNameGenerator";

export default function Chatbox(params) {
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  }, [userData]);

  const [messageColor, setMessageColor] = useState("");
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [typingTimer, setTypingTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatMessages, setChatMessages] = useState([]);
  const [activityMessage, setActivityMessage] = useState("");

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const accessTokenObj = localStorage.getItem("token");
    if (!accessTokenObj) return alert("Please login");

    setMessageColor(nameColor);
    setIsLoading(true);
    setActivityMessage("");

    if (message.trim() === "") {
      setEmptyMessage(true);
      setIsLoading(false);
      return;
    }

    setEmptyMessage(false);
    if (data) {
      const messageData = {
        message: message.trim(),
        identifier: "msg",
        data: data,
        userId: socket.id,
      };
      socket.timeout(5000).emit("create-something", messageData, (err) => {
        setIsLoading(false);
        if (err) {
          console.error("Message sending failed", err);
        }
      });
    }

    setMessage("");
  };

  const onTyping = () => {
    socket.emit("activity", data?.username);

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
      socket.emit("user-connected", data.username);
      setIsConnected(true);
    }

    function onDisconnect() {
      socket.emit("user-disconnected", data.username);
      setIsConnected(false);
    }

    function onChatMessages(message) {
      setActivityMessage("");
      setChatMessages((previous) => [...previous, message]);
    }

    function onActivity(names) {
      setActivityMessage(names);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatMessages", onChatMessages);
    socket.on("activity", onActivity);
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chatMessages", onChatMessages);
      socket.off("activity", onActivity);
    };
  }, [data]);

  useEffect(() => {}, [chatMessages]);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const addEmoji = (emoji) => {
     setMessage((previous) => previous + emoji.emoji);
  };
  return (
    <div className="mb-4 w-full max-w-3xl rounded-lg bg-gray-800 shadow-md">
      <header className="rounded-t-lg bg-gray-900 p-4 text-white">
        <h1 className="text-xl font-bold">Live Chat</h1>
      </header>
      <div className="scrollbar-hide relative h-96 overflow-y-auto p-4 ">
        <div className="flex w-full flex-col justify-end space-y-2">
          {chatMessages.map((event, index) => (
            <div key={index}>
              <div
                className={`flex items-center py-1 ${
                  event.userId === socket.id ? "justify-end " : "justify-start"
                }`}
              >
                {event.identifier === "msg" && (
                  <>
                    {event.data && (
                      <>
                        <div
                          className={`flex w-1/2 flex-row  rounded-lg ${
                            event.userId === socket.id
                              ? "bg-blue-500"
                              : "bg-gray-700"
                          }`}
                        >
                          <div className="  m-auto  h-auto w-1/5 ">
                            <img
                              className="m-auto h-10 w-10 rounded-full border"
                              src={event.data.avatarUrl}
                              alt={event.data.username}
                            />
                          </div>
                          <div
                            className={`w-4/5  rounded-lg p-2  ${
                              event.userId === socket.id
                                ? "bg-blue-500"
                                : "bg-gray-700"
                            }`}
                          >
                            <div className="w-4/5 break-words p-1">
                              <div className="my-1 text-sm font-semibold text-orange-400">
                                {event.data.username}
                              </div>
                              <div className="text-white">{event.message}</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {event.identifier === "miscellaneousMessage" && (
                  <div className="w-full p-2 text-center text-teal-500">
                    {event.message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {activityMessage && (
          <p className="py-2 text-sm italic">
            <span style={{ color: nameColor }}>{activityMessage}</span> is
            typing...
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmitMessage}
        className="relative flex rounded-b-lg bg-gray-900 p-4"
      >
        <i
          popover
          id="my-popover"
          onClick={toggleEmojiPicker}
          className=" fa fa-smile  z-40 m-auto cursor-pointer bg-slate-900 p-1 text-2xl"
        ></i>
        {emojiPickerVisible && (
          <div popovertarget="my-popover" className="absolute top-16">
            <EmojiPicker onEmojiClick={addEmoji}></EmojiPicker>
          </div>
        )}

        <input
          className="min-w-8 flex-grow rounded-l-lg bg-gray-700 p-2 text-white focus:outline-none"
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          value={message}
          id="message"
          onKeyDown={onTyping}
          placeholder="Type your message..."
          aria-label="Type your message"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-r-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
          aria-label="Send message"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
