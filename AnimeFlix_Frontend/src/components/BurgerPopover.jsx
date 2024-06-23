
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
    <div  className="relative lg:hidden inline-block">
      <button
        data-popover-target="popover-user-profile"
        type="button"
        className= " text-lg text-orange-300 "
        onClick={togglePopover}
      >
        <i className="fas fa-hamburger"></i>
      </button>

      <div
        data-popover
        id="popover-user-profile"
        role="tooltip"
        ref={popoverRef}
        className={`absolute z-50 inline-block w-36 text-sm text-gray-700 transition-opacity duration-300   border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
          <div className="  text-white   flex flex-col space-y-3 m-2">
            <a href="/home" className="hover:underline">
              Home
            </a>
             
            <a href="/community" className="hover:underline">
              Community
            </a>
         
            <a href="/watchtogether" className="hover:underline">
              Watch Together
            </a>
          </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  );
};

export default UserProfilePopover;
