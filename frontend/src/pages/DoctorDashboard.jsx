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

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.map((a) => (
        <div key={a._id} style={{ marginBottom: "10px" }}>
          <div>
            {new Date(a.date).toLocaleString()} – Patient: {a.patient?.name} – Status:{" "}
            <b>{a.status}</b>
          </div>

          {a.status === "pending" && (
            <>
              <button onClick={() => updateStatus(a._id, "approved")}>Approve</button>
              <button onClick={() => updateStatus(a._id, "rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
