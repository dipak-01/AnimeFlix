import "../styles/user.css";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/authService";
// Ensure you have imported the correct Eartho SDK

export default function UserProfile() {
  const [message, setMessage] = useState("");
  const [toggleChangePass, setToggleChangePass] = useState(false);
  const [profileImage, setProfileImage] = useState("default-profile.png"); // Placeholder image

  const [data, setData] = useState();

  const handleChangePass = () => {
    setToggleChangePass(!toggleChangePass);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    // Assuming you have a function to upload the image and get back the URL
    uploadImage(file)
      .then((imageUrl) => {
        setProfileImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  useEffect(() => {
    const getData = async () => {
      const results = await fetchUserData();
      setData(results);
    };
    getData();
  }, []);
  const handleSubmit = async () => {};
  const images = [
    "https://media.discordapp.net/attachments/1142746103029174274/1256929488038527006/pro2.jpg?ex=66828e4e&is=66813cce&hm=064d79bdb5cc72a30b8a961b80007e35eff77f83edb7f62e91ee31b21f415f9b&=&format=webp&width=1440&height=390",
    "https://cdn.discordapp.com/attachments/1142746103029174274/1256929487401254912/pro1.jpg?ex=66828e4e&is=66813cce&hm=579a6e1f6cb557adcda6135239b0bfec70ba825f9fbe0e1ea488c0e5dde2f915&",
    "https://media.discordapp.net/attachments/1142746103029174274/1256929488546168912/pro3.jpg?ex=6685da0e&is=6684888e&hm=5853129dc815606558f5ad019dd259d2b40b13b30676c3841499c40b245aab62&=&format=webp&width=1440&height=476",
  ];

  return (
    <>
      {data && (
        <main className="  mx-auto my-4 w-full max-w-[1420px] px-2 text-white sm:px-4 lg:px-6 xl:px-0">
          <div
            style={{
              backgroundImage: `url(${images[2]})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center ",
              objectFit: "cover",
            }}
            className="relative flex h-40 items-center bg-french-gray-100"
          >
            <div className="absolute z-10 h-full w-full bg-gray-700/75 blur-sm"></div>
            <p className="z-20 m-auto text-4xl font-bold text-black">
              Hi, {data.username}
            </p>
          </div>

          <div className="m-4   mx-auto flex w-2/4 justify-between border-b-2 border-gray-900 p-4">
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

          <div className="mx-auto h-auto w-2/4  ">
            <p className="py-4 text-start text-3xl">
              <i className="fas fa-user"></i> Edit Profile
            </p>
            <div className="flex">
              <form
                onSubmit={handleSubmit}
                className="inputclass w-2/3 space-y-6 border-2 border-gray-900 p-8 text-start uppercase"
              >
                <div>
                  <p>email address</p>
                  <input
                    className=""
                    type="text"
                    value={data.email}
                    placeholder=""
                    disabled
                  />
                </div>
                <div>
                  <p>name</p>
                  <input
                    defaultValue={data.username}
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
                      <input
                        className=""
                        type="password"
                        aria-label="password"
                      />
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
                  className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                  Update Username
                </button>
                {message && <p>{message}</p>}
              </form>
              <div className="flex   w-1/3  justify-center pt-16 ">
                <div className="flex w-full  items-start justify-center ">
                  <div className="relative">
                    <img
                      className="h-32 w-32 rounded-full bg-slate-200 "
                      src={profileImage}
                      alt="Profile"
                    />
                    <div className="absolute bottom-0 right-0">
                      <label
                        htmlFor="files"
                        className="flex cursor-pointer items-center justify-center rounded-full bg-blue-500 p-2 text-white"
                      >
                        <i className="fas fa-pen"></i>
                      </label>
                      <input
                        id="files"
                        className="hidden"
                        onChange={handleImageChange}
                        type="file"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
