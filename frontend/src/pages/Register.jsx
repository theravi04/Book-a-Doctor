import { useState } from "react";
import { request } from "../api/api";
import { saveAuth } from "../auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });

  const submit = async (e) => {
    e.preventDefault();
    const data = await request("/auth/register", "POST", form);
    if (data.token) {
      saveAuth(data);
      window.location = "/";
    } else {
      alert(data.message || "Register failed");
    }
  };

  return (
    <div className="w-full px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Register
          </h2>
          
          <form onSubmit={submit} className="space-y-4">
            <div>
              <input 
                type="text"
                placeholder="Name" 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input 
                type="email"
                placeholder="Email" 
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input 
                placeholder="Password" 
                type="password" 
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <select 
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {form.role === "doctor" && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <input 
                  type="text"
                  placeholder="Specialization" 
                  value={form.specialization || ""}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            )}
            
            <button 
              type="submit"
              className="w-full px-4 py-3 border border-gray-400 rounded hover:border-gray-600 hover:bg-gray-50 transition-colors font-medium text-lg mt-6"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}