import { useEffect, useState } from "react";
import { fetchUserData, updateUserData } from "../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AnimeQuoteCard from "../components/AnimeQuoteCard";

// Modal component for changing username
function ChangeUsernameModal({ isOpen, onClose, onSubmit }) {
  const [newUsername, setNewUsername] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Change Username</h2>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="mb-4 w-full rounded bg-gray-700 p-2 text-white"
          placeholder="New username"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 rounded bg-gray-600 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(newUsername)}
            className="rounded bg-blue-600 px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal component for changing password
function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const [validationMessage, setValidationMessage] = useState("");

  const validatePassword = (password) => {
    const requirements = [
      {
        test: (pw) => pw.length >= 8,
        message: "Password must be at least 8 characters long.",
      },
      {
        test: (pw) => /[A-Z]/.test(pw),
        message: "Password must include at least one uppercase letter.",
      },
      {
        test: (pw) => /[a-z]/.test(pw),
        message: "Password must include at least one lowercase letter.",
      },
      {
        test: (pw) => /\d/.test(pw),
        message: "Password must include at least one number.",
      },
      {
        test: (pw) => /[!@#$%^&*]/.test(pw),
        message:
          "Password must include at least one special character (!@#$%^&*).",
      },
    ];

    const failingRequirement = requirements.find((req) => !req.test(password));
    setValidationMessage(failingRequirement ? failingRequirement.message : "");
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Change Password</h2>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="mb-4 w-full rounded bg-gray-700 p-2 text-white"
          placeholder="Current password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => {
            const newValue = e.target.value;
            setNewPassword(newValue);
            validatePassword(newValue);
          }}
          className="mb-4 w-full rounded bg-gray-700 p-2 text-white"
          placeholder="New password"
        />
        {validationMessage && (
          <p className="mb-3 text-sm text-red-500">{validationMessage}</p>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 rounded bg-gray-600 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(oldPassword, newPassword)}
            className="rounded bg-blue-600 px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.userData.data);
  const updateUsersData = useSelector((state) => state.updateUserData);
  const [data, setData] = useState(null);
  const [banner, setBanner] = useState(localStorage.getItem("banner") || "");
  const [profileImage, setProfileImage] = useState(null);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (usersData) {
      setData(usersData);
    }
  }, [usersData, updateUserData]);

  useEffect(() => {
    localStorage.setItem("banner", banner);
  }, [banner]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    handleImageChange(e, setBanner);
  };

  const handleProfileImageChange = (e) => {
    handleImageChange(e, setProfileImage);
    // Update profile image in the backend
    dispatch(updateUserData({ avatarUrl: e.target.files[0] }));
  };

  const handleUsernameChange = (newUsername) => {
    dispatch(updateUserData({ userName: newUsername }));
    setIsUsernameModalOpen(false);
  };

  const handlePasswordChange = (oldPassword, newPassword) => {
    dispatch(updateUserData({ oldPassword, newPassword }));
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="mx-auto max-w-[1420px] px-4 py-8">
        {data && (
          <div className="overflow-hidden rounded-lg bg-gray-900 shadow-lg">
            <div
              className="relative h-60 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner || "https://via.placeholder.com/1500x500"})`,
              }}
            >
              <label
                htmlFor="banner-upload"
                className="absolute bottom-4 right-4 cursor-pointer rounded-md bg-black bg-opacity-50 px-4 py-2 text-white transition hover:bg-opacity-70"
              >
                Change Banner
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="px-6 py-4">
              <div className="-mt-20 mb-4 flex flex-col items-center md:flex-row md:items-end">
                <div className="relative">
                  <img
                    src={
                      profileImage ||
                      data.profileImage ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="h-40 w-40 rounded-full border-4 border-gray-800 object-cover shadow-lg"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-gray-800 px-2 py-1 text-sm text-white transition hover:bg-gray-700"
                  >
                    Edit
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
                  <h2 className="text-3xl font-bold">{data.username}</h2>
                  <p className="text-xl text-gray-400">{data.email}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Joined: {data.createdAt?.slice(0, 10)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex w-full flex-col items-center  justify-center space-x-4 space-y-4 lg:flex-row lg:space-y-0">
                <a
                  href="#"
                  className="rounded-2xl bg-zinc-800 p-2 text-blue-400 hover:text-blue-300"
                >
                  <i className="fa fa-television mx-1"></i>
                  Continue Watching
                </a>
                <a
                  href="#"
                  className="rounded-2xl bg-zinc-800 p-2 text-blue-400 hover:text-blue-300"
                >
                  <i className="fa fa-list mx-1"></i>
                  Watchlist
                </a>
              </div>
              <div className="mt-4 border-t border-gray-800 pt-4">
                <h3 className="mb-2 text-xl font-semibold">About Me</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="mt-6 flex   flex-col items-center space-y-4">
                <button
                  onClick={() => setIsUsernameModalOpen(true)}
                  className="w-full max-w-xs rounded-full bg-blue-600 px-6 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-700"
                >
                  Change Username
                </button>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full max-w-xs rounded-full bg-blue-600 px-6 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-700"
                >
                  Change Password
                </button>
                <button
                  onClick={() =>
                    alert("Edit profile feature to be implemented")
                  }
                  className="w-full max-w-xs rounded-full bg-blue-600 px-6 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <ChangeUsernameModal
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
        onSubmit={handleUsernameChange}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
}
// Joined: {data.createdAt.slice(0, 10)}
