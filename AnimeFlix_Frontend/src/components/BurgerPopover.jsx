import React, { useState, useRef, useEffect } from "react";

const UserProfilePopover = () => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block lg:hidden">
      <button
        data-popover-target="popover-user-profile"
        type="button"
        className="rounded-full bg-orange-100 p-2 text-lg text-orange-500 shadow hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
        onClick={togglePopover}
        aria-label="Open user menu"
        aria-expanded={isVisible}
        aria-controls="popover-user-profile"
      >
        <i className="fas fa-hamburger"></i>
      </button>

      {/* Backdrop for mobile popover */}
      {isVisible && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300"
          onClick={() => setIsVisible(false)}
          aria-label="Close menu"
        />
      )}

      <div
        data-popover
        id="popover-user-profile"
        role="menu"
        ref={popoverRef}
        className={`fixed left-1/2 top-20 z-50 w-11/12 max-w-xs -translate-x-1/2 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 shadow-2xl transition-all duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
          isVisible
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{ minWidth: 200, padding: 0 }}
        tabIndex={isVisible ? 0 : -1}
        aria-hidden={!isVisible}
      >
        <button
          className="absolute right-3 top-3 rounded-full bg-gray-100 p-2 text-gray-400 shadow hover:bg-orange-100 hover:text-orange-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setIsVisible(false)}
          aria-label="Close menu"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col gap-3 p-6 pt-12">
          <a
            href="/home"
            className="rounded-lg bg-orange-50 px-4 py-3 text-center font-semibold text-orange-600 shadow hover:bg-orange-100 dark:bg-gray-700 dark:text-orange-300 dark:hover:bg-gray-600"
            onClick={() => setIsVisible(false)}
          >
            Home
          </a>
          <a
            href="/community"
            className="rounded-lg bg-orange-50 px-4 py-3 text-center font-semibold text-orange-600 shadow hover:bg-orange-100 dark:bg-gray-700 dark:text-orange-300 dark:hover:bg-gray-600"
            onClick={() => setIsVisible(false)}
          >
            Community
          </a>
          <a
            href="/watchtogether"
            className="rounded-lg bg-orange-50 px-4 py-3 text-center font-semibold text-orange-600 shadow hover:bg-orange-100 dark:bg-gray-700 dark:text-orange-300 dark:hover:bg-gray-600"
            onClick={() => setIsVisible(false)}
          >
            Watch Together
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopover;
