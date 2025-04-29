import { NavLink } from "react-router-dom";
import { assets } from "../img/assets";

export const Header = () => {
  const linkActiveStyle = ({ isActive }) => {
    return {
      borderBottom: isActive ? "2px solid white" : "", // Optional: Add a color change for better visual indication
    }
  }

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-10 mb-10 shadow-lg backdrop-opacity-100 blur-100">
      <img className="object-cover w-20" src={assets.uzair_logo} alt="logo"></img>
      <ul className="flex gap-8 font-semibold text-[16px] text-white">
        <li><NavLink to='/' style={(isActive) => linkActiveStyle(isActive)}> Home </NavLink> </li>
        <li><NavLink to='post' style={(isActive) => linkActiveStyle(isActive)}> Posts </NavLink> </li>
        <li><NavLink to='user' style={(isActive) => linkActiveStyle(isActive)}> Users </NavLink> </li>
      </ul>
    </header>
    
  )
}

export default Header

