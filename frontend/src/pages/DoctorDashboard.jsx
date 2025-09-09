import { useEffect, useState } from "react";
import { request } from "../api/api";
import { getAuth } from "../auth";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const data = await request("/doctors/appointments", "GET", null, auth.token);
      setAppointments(data);
    })();
  }, []);

  const updateStatus = async (id, status) => {
    await request(`/appointments/${id}/status`, "PUT", { status }, auth.token);
    alert(`Appointment ${status}`);
    // refresh appointments after update
    const data = await request("/doctors/appointments", "GET", null, auth.token);
    setAppointments(data);
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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          My Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500 italic text-center text-lg">
            No appointments found
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div 
                key={a._id} 
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                {/* Appointment Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {new Date(a.date).toLocaleString()}
                    </span>
                    <span className="text-gray-400 hidden sm:inline">–</span>
                    <span className="text-gray-700">
                      <span className="font-medium">Patient:</span> {a.patient?.name}
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(a.status)}`}>
                      {a.status}
                    </span>
                  </div>
                </div>

                {/* Action Buttons - Only show for pending appointments */}
                {a.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => updateStatus(a._id, "approved")}
                      className="px-4 py-2 border border-green-300 text-green-700 rounded hover:border-green-500 hover:bg-green-50 transition-colors font-medium"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(a._id, "rejected")}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded hover:border-red-500 hover:bg-red-50 transition-colors font-medium"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}