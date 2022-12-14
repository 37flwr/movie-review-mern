import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import NavItem from "./NavItem";

const Navbar = () => {
  const { handleLogout } = useAuth();
  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-grey-300">
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul>
          <li className="mb-8">
            <Link to="/">
              <img src="./logo.png" alt="logo" className="h-14 p-2" />
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies?page=1">
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors?page=1">
              <FaUserNinja />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-start pb-5">
          <span className="font-semibold text-white text-xl">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-dark-subtle text-sm hover:text-white transition"
          >
            <FiLogOut />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
