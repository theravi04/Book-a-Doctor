import { useState } from "react";
import { request } from "../api/api";
import { saveAuth } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const data = await request("/auth/login", "POST", { email, password });
    if (data.token) {
      saveAuth(data);
      window.location = "/";
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="w-full px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Login
          </h2>
          
          <form onSubmit={submit} className="space-y-4">
            <div>
              <input 
                type="email"
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <input 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-3 border border-gray-400 rounded hover:border-gray-600 hover:bg-gray-50 transition-colors font-medium text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}