import classNames from "classnames";
import { NavLink } from "react-router-dom";

const NavItem = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          isActive ? "text-white font-semibold" : "text-gray-400",
          "flex items-center text-lg space-x-2 p-2 hover:opacity-80"
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
