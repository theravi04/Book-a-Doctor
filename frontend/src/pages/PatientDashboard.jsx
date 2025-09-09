import { useEffect, useState } from "react";
import { request } from "../api/api";
import { getAuth } from "../auth";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      setDoctors(await request("/doctors"));
      setAppointments(await request("/appointments/my", "GET", null, auth.token));
    })();
  }, []);
// console.log(appointments);

  const book = async (doctorId) => {
    const date = prompt("Enter date (YYYY-MM-DD HH:mm)");
    if (!date) return;
    await request("/appointments/book", "POST", { doctorId, date }, auth.token);
    alert("Appointment booked");
    window.location.reload();
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Patient Dashboard
        </h1>

        {/* Doctors Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
            Available Doctors
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {doctors.length === 0 ? (
              <p className="text-gray-500 italic col-span-full">No doctors available</p>
            ) : (
              doctors.map((d) => (
                <div 
                  key={d._id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white shadow-sm"
                >
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Dr. {d.user.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {d.specialization ?? "General Practice"}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => book(d._id)}
                    className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium"
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Appointments Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
            My Appointments
          </h2>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-gray-500 italic">No appointments found</p>
            ) : (
              appointments.map((a) => (
                <div 
                  key={a._id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {new Date(a.date).toLocaleString()}
                      </span>
                      <span className="text-gray-400 hidden sm:inline">with</span>
                      <span className="text-gray-700">
                        <span className="font-medium">Dr. {a.doctor?.user?.name}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(a.status)}`}>
                        {a.status}
                      </span>
                    </div>
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