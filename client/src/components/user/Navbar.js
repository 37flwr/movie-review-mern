import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2 flex justify-between">
        <Link to="/">
          <img src="./logo.png" alt="" className="h-10" />
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <button
              onClick={toggleTheme}
              className="dark:bg-white bg-dark-subtle p-1 rounded"
            >
              <BsFillSunFill className="text-secondary" size={24} />
            </button>
          </li>
          <li>
            <input
              className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
              placeholder="Search..."
            />
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className="text-white font-semibold text-lg"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : (
              <Link
                to="/auth/signin"
                className="text-white font-semibold text-lg"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;
