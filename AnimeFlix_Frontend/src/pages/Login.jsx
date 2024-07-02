import React, { useState, useEffect } from "react";
import { register, login } from "../services/authService";
import "../styles/user.css";
import { SuccessAlert, FailedAlert } from "../components/Alerts";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [toggleLogin, setToggleLogin] = useState(true);
  const [token, setToken] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
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
  const loginImages = [
    "/loginImage/rei1.png",
    "/loginImage/rei2.png",
    "/loginImage/rei3.png",
    "/loginImage/asuka1.png",
    "/loginImage/asuka2.png",
    "/loginImage/asuka3.png",
  ];
  const handleRegister = async () => {
    await register(username, email, password);
    setAlertMessage("Registered");

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    setToggleLogin(!toggleLogin);
  };

  const handleLogin = async () => {
    const data = await login(email, password);
    setToken(data.token);
    setAlertMessage("Logged In");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    navigate('/home');
  };
  const toggleLoginHandle = () => {
    setToggleLogin(!toggleLogin);
  };
  const [randomRei, setRandomRei] = useState(0);
  const [randomAsuka, setRandomAsuka] = useState(3);

  useEffect(() => {
    const rei = Math.floor(Math.random() * 3); // 0 to 2
    const asuka = 3 + Math.floor(Math.random() * 3); // 3 to 5
    setRandomRei(rei);

    setRandomAsuka(asuka);
  }, []);

  return (
    <main className="h-screen flex items-center text-white lg:px-6 px-2 w-full max-w-[1420px] my-4 mx-auto xl:px-0 sm:px-4">
      {showAlert && <SuccessAlert keyword={alertMessage} />}
      <div className="h-3/4 w-full mx-auto">
        {toggleLogin ? (
          <>
            <div className="w-2/4 space-x-4 max-h-none h-3/4  m-auto bg-slate-950 rounded-3xl border-2 border-teal-500 flex items-center shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
              <div className={`flex flex-col p-4 text-start logininp w-1/2  `}>
                <div className="font-bold text-2xl">REGISTER</div>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {validationMessage && (
                    <div className="text-sm text-red-500 pt-2 px-2">
                      {validationMessage}
                    </div>
                  )}
                </div>
                {/* <div className="mb-3">
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                    value={password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div> */}
                <div className="flex items-start mb-3">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                    .
                  </label>
                </div>
                <button
                  className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 uppercase font-semibold"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <div className="text-sm">
                  Already registered?<span> </span>
                  <button
                    onClick={() => toggleLoginHandle()}
                    className="text-orange-500"
                  >
                    {" "}
                    Sign In
                  </button>
                </div>
              </div>

              <div className="w-1/2 h-full relative ">
                <img
                  className=" absolute inset-x-0 bottom-0 "
                  src={loginImages[randomRei]}
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-2/4 space-x-4 max-h-none h-3/4   m-auto bg-slate-950 rounded-3xl border-2 border-teal-500 flex flex-row-reverse items-center shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
              <div className={`flex flex-col text-start logininp w-1/2 p-4 `}>
                <div className="font-bold text-2xl">LOGIN</div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-start mb-3">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>
                <button
                  className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 uppercase font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className="text-sm">
                  Not registered? <span> </span>
                  <button
                    onClick={() => toggleLoginHandle()}
                    className="text-orange-500"
                  >
                    {" "}
                    Create an account.
                  </button>
                </div>
              </div>

              <div className="w-1/2 h-full relative ">
                <img
                  className="absolute inset-x-0 bottom-0  "
                  src={loginImages[randomAsuka]}
                  alt=""
                />
              </div>
            </div>
          </>
        )}

        {token && <p>JWT Token: {token}</p>}
      </div>
    </main>
  );
};

export default Auth;
