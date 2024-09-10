import { useState, useEffect } from "react";
import { register } from "../services/authService";
import "../styles/user.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [randomRei, setRandomRei] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const navigate = useNavigate();

  const loginImages = [
    "/loginImage/rei1.png",
    "/loginImage/rei2.png",
    "/loginImage/rei3.png",
    "/loginImage/asuka1.png",
    "/loginImage/asuka2.png",
    "/loginImage/asuka3.png",
  ];

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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleRegister = async () => {
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    try {
      const response = await register(username, email, password);
      toast.success(response);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const rei = Math.floor(Math.random() * 3); // 0 to 2
    setRandomRei(rei);
  }, []);

  return (
    <main className="mx-auto my-4 flex h-auto min-h-screen w-full max-w-[1420px] items-center px-2 text-white sm:px-4 lg:px-6 xl:px-0">
      <Toaster />
      <div className="mx-auto h-3/4 w-full">
        <div className="mx-auto my-10 flex h-3/4 max-h-none w-3/4 items-center space-x-4 rounded-3xl border-2 border-teal-500 bg-slate-950 shadow-lg lg:m-auto lg:w-2/4">
          <div className="logininp flex w-full flex-col p-4 text-start lg:w-1/2">
            <div className="text-2xl font-bold">REGISTER</div>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                required
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="john"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                required
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="john.doe@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={passwordVisible ? "text" : "password"} // Toggle input type
                  id="password"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="•••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {validationMessage && (
              <p className="mb-3 text-sm text-red-500">{validationMessage}</p>
            )}
            <div className="mb-3 flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <button
              className="mb-2 me-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2.5 text-center text-sm font-semibold uppercase text-white shadow-lg hover:bg-gradient-to-br focus:outline-none active:scale-105"
              onClick={handleRegister}
            >
              Register
            </button>
            <div className="text-sm">
              Already registered?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-orange-500"
              >
                Login
              </button>
            </div>
          </div>
          <div className="hidden h-80 w-1/2 overflow-hidden lg:block">
            <img
              className="w-full"
              src={loginImages[randomRei]}
              alt="Register Illustration"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
