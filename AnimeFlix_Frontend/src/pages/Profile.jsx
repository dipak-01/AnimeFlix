import "../styles/user.css";
import { useState } from "react";
import {
  useEarthoOne,
  withAuthenticationRequired,
 
} from "@eartho/one-client-react";
  // Ensure you have imported the correct Eartho SDK

export default function UserProfile() {
  const [message, setMessage] = useState("");
  const [toggleChangePass, setToggleChangePass] = useState(false);
  const { isLoading, isConnected, error, user, connectWithPopup, logout } =
    useEarthoOne();
 
  const [username, setUsername] = useState(user?.displayName);
  const handleChangePass = () => {
    setToggleChangePass(!toggleChangePass);
  };
  const data = {
    displayName: username,
  };

  const handleSubmit = async () => {
    // Mark the function as async to handle the promise
    try {
      const user = await earthoOne.user.update({ data }); // Use await to wait for the promise to resolve
      console.log(user); // Optionally, handle the user object, e.g., logging it to the console
    } catch (error) {
      console.error(error); // Handle any errors that occur during the update
    }
  };
  const images = [
    "https://media.discordapp.net/attachments/1142746103029174274/1256929488038527006/pro2.jpg?ex=66828e4e&is=66813cce&hm=064d79bdb5cc72a30b8a961b80007e35eff77f83edb7f62e91ee31b21f415f9b&=&format=webp&width=1440&height=390",
    "https://cdn.discordapp.com/attachments/1142746103029174274/1256929487401254912/pro1.jpg?ex=66828e4e&is=66813cce&hm=579a6e1f6cb557adcda6135239b0bfec70ba825f9fbe0e1ea488c0e5dde2f915&",
    "https://media.discordapp.net/attachments/1142746103029174274/1256929488546168912/pro3.jpg?ex=66828e4e&is=66813cce&hm=0f982e440f612bf843e9d5329858aba80e49bc49ac6aabc623f7d29b49f43912&=&format=webp&width=1440&height=476",
  ];

  return (
    <>
      {isConnected && (
        <main className="h-screen text-white lg:px-6 px-2 w-full max-w-[1420px] my-4 mx-auto xl:px-0 sm:px-4">
          <div
            style={{
              backgroundImage: `url(${images[1]})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
              objectFit: "cover",
            }}
            className="flex relative h-1/4 bg-french-gray-100 items-center"
          >
            <div className="absolute z-10 w-full h-full bg-gray-700/75 blur-sm"></div>
            <p className="z-20 text-4xl text-black font-bold m-auto">
              Hi, {user.displayName}
            </p>
          </div>

          <div className="flex w-2/4 mx-auto justify-between p-4 m-4 border-b-2 border-gray-900">
            <a href="">
              <i className="fas fa-user"></i> Profile
            </a>
            <a href="">
              <i className="fas fa-heart"></i> WatchList
            </a>
            <a href="">
              <i className="fas fa-clock"></i> Continue Watching
            </a>
          </div>
          <div className="w-2/4 h-auto mx-auto">
            <p className="text-start text-3xl py-4">
              <i className="fas fa-user"></i> Edit Profile
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full border-2 border-gray-900 p-8 text-start uppercase space-y-6 inputclass"
            >
              <div>
                <p>email address</p>
                <input
                  className=""
                  type="text"
                  value={user.email}
                  placeholder=""
                  disabled
                />
              </div>
              <div>
                <p>name</p>
                <input
                  defaultValue={user.displayName}
                  className=""
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <p>date joined</p>
                <input className="" type="date" />
              </div>
              <div>
                <p className="cursor-pointer" onClick={handleChangePass}>
                  <i className="fas fa-key"></i> change password
                </p>
              </div>
              {toggleChangePass && (
                <div className="space-y-6">
                  <div>
                    <p>current password</p>
                    <input className="" type="password" aria-label="password" />
                  </div>
                  <div>
                    <p>new password</p>
                    <input className="" type="password" />
                  </div>
                  <div>
                    <p>confirm new password</p>
                    <input className="" type="password" />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Username
              </button>
              {message && <p>{message}</p>}
            </form>
          </div>
        </main>
      )}
    </>
  );
}
