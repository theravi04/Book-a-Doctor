import { Link } from "react-router-dom";
import { getAuth, logout } from "../auth";

export default function Navbar() {
  const auth = getAuth();

  return (
    <nav className="w-full px-4 py-3 md:px-6 lg:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section - Home */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-lg font-semibold hover:opacity-75 transition-opacity">
            Home
          </Link>
        </div>
        
        {/* Right section - Auth links */}
        <div className="flex items-center space-x-1 md:space-x-3">
          {!auth ? (
            <>
              <Link 
                to="/login" 
                className="italic hover:opacity-75 transition-opacity px-2 py-1"
              >
                Login
              </Link>
              <span className="text-gray-400 select-none hidden sm:inline">|</span>
              <Link 
                to="/register" 
                className="italic hover:opacity-75 transition-opacity px-2 py-1"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium text-sm md:text-base px-2 py-1">
                {auth.user.role.toUpperCase()}
              </span>
              <span className="text-gray-400 select-none hidden sm:inline">|</span>
              <Link 
                to="/profile" 
                className="italic hover:opacity-75 transition-opacity px-2 py-1"
              >
                Profile
              </Link>
              <span className="text-gray-400 select-none hidden sm:inline">|</span>
              <button 
                onClick={() => { logout(); window.location = "/"; }}
                className="border border-gray-300 px-3 py-1 rounded hover:border-gray-500 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}