import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { signInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.name || user?.email;
  return (
    <nav className=" fixed top-0 w-full z-40 bg-[rgba(15,21,31,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-mono text-xl font-bold text-white">
            <span className="text-blue-500">Hail University</span> Support
          </Link>

          {/*Desktop */}

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Communities
            </Link>
            <Link
              to="/community-create"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Create New Community
            </Link>
          </div>

          {/*auth Desk*/}
          <div className=" hidden md:flex items-center  text-sm  ">
            {user ? (
              <div className="flex items-center space-x-2">
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-300">{displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-red-500 px-3 py-1 rounded text-xs"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="bg px-3 py-1 rounded bg-blue-400 flex  items-center"
              >
                Sign In With <FcGoogle className="ml-2.5 w-6 h-7" />
              </button>
            )}
          </div>

          {/* menu button IOS */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-300 focus:outline-none "
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.9)]">
          <div className="px-2 pt-2 pb-3">
            <Link
              to="/"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Communities
            </Link>
            <Link
              to="/community-create"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Create New Community
            </Link>
            <div className="  md:hidden items-center flex justify-center py-2 mt-2  rounded-2xl w-1/2 mx-auto ">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.user_metadata.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-gray-300">{displayName}</span>
                  <button
                    onClick={signOut}
                    className="bg-red-400 px-3 py-1 rounded text-sm "
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGitHub}
                  className="bg px-3 py-1 rounded bg-blue-400 flex  items-center"
                >
                  Sign In With <FcGoogle className="ml-2.5 w-6 h-7" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
