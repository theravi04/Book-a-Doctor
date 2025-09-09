import { Link } from "react-router-dom";
import { getAuth } from "../auth";

export default function Home() {
  const auth = getAuth();

  return (
    <div className="w-full px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Welcome to Book-a-Doctor
        </h1>
        
        {!auth ? (
          <>
            {/* Not logged in content */}
            <p className="text-lg md:text-xl mb-6 text-gray-600">
              Please login or register to continue.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
              <Link 
                to="/login" 
                className="italic hover:opacity-75 transition-opacity px-4 py-2 text-lg"
              >
                Login
              </Link>
              <span className="text-gray-400 select-none hidden sm:inline text-lg">|</span>
              <Link 
                to="/register" 
                className="italic hover:opacity-75 transition-opacity px-4 py-2 text-lg"
              >
                Register
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Logged in content */}
            <p className="text-lg md:text-xl mb-6 text-gray-600">
              You are logged in as <span className="font-bold text-black">{auth.user.role}</span>.
            </p>
            
            <Link 
              to="/dashboard" 
              className="inline-block border border-gray-300 px-6 py-3 rounded hover:border-gray-500 transition-colors text-lg font-medium italic"
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}