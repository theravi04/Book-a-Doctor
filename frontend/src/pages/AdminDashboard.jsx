import { useEffect, useState } from "react";
import { request } from "../api/api";
import { getAuth } from "../auth";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      setUsers(await request("/admin/users", "GET", null, auth.token));
      setDoctors(await request("/admin/doctors", "GET", null, auth.token));
      setAppointments(await request("/admin/appointments", "GET", null, auth.token));
    })();
  }, []);
  // console.log("Appointments:", appointments);
    
  return (
    <div className="w-full px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* All Users Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
            All Users
          </h2>
          <div className="space-y-2">
            {users.length === 0 ? (
              <p className="text-gray-500 italic">No users found</p>
            ) : (
              users.map((u) => (
                <div 
                  key={u._id} 
                  className="p-3 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                >
                  <span className="font-medium">{u.name}</span>
                  <span className="text-gray-500 ml-2">
                    ({u.role})
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* All Doctors Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
            All Doctors - Their Specialization
          </h2>
          <div className="space-y-2">
            {doctors.length === 0 ? (
              <p className="text-gray-500 italic">No doctors found</p>
            ) : (
              doctors.map((d) => (
                <div 
                  key={d._id} 
                  className="p-3 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                >
                  <span className="font-medium">{d.user.name}</span>
                  <span className="text-gray-600 mx-2">-</span>
                  <span className="text-gray-700">
                    {d.specialization ?? "Not Provided"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* All Appointments Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
            All Appointments
          </h2>
          <div className="space-y-2">
            {appointments.length === 0 ? (
              <p className="text-gray-500 italic">No appointments found</p>
            ) : (
              appointments.map((a) => (
                <div 
                  key={a._id} 
                  className="p-3 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-medium text-gray-800">{a.date}</span>
                    <span className="text-gray-400 hidden sm:inline">-</span>
                    <span className="text-gray-700">
                      <span className="font-medium">{a.patient?.name}</span>
                      <span className="text-gray-600 mx-1">with</span>
                      <span className="font-medium">Dr {a.doctor?.user?.name}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}