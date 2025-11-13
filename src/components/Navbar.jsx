import React, { use, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = use(AuthContext);

  const { displayName, photoURL } = user || {};
  
  const handleSingOut = () => {
    logout()
        .then(() => {
            toast.success("LogOut Successfully")
        }).catch((err) => {
            const errorMessage = err.message;
            toast.error(errorMessage)
        });
  }

  const links = (
    <>
      <li className="nav-btn ">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="nav-btn">
        <NavLink to={"/findPartners"}>Find Partners</NavLink>
      </li>

      {
        user && 
        <>
            <li className="nav-btn">
                <NavLink to={"/createPartnerProfile"}>Create Partner Profile</NavLink>
            </li>
            <li className="nav-btn">
                <NavLink to={"/myConnections"}>My Connections</NavLink>
            </li>
        </>
      }

      <li className="nav-btn">
        <NavLink to={"/about"}>About Us</NavLink>
      </li>
      <li className="nav-btn">
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm mb-16">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="text-2xl font-bold">
          Study
          <span className="p-0 text-primary">Mate</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={photoURL ? photoURL : "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"}
                  alt={`user ${displayName} profile photo`}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={'/myProfile'} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={handleSingOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to={"/login"} className="btn secondary-btn gradient-border font-semibold ">
              Login
            </Link>
            <Link to={"/register"} className="btn primary-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
