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

  return (
    <div>
      <h2>Doctors - Their Specialization</h2>
      {doctors.map((d) => (
        <div key={d._id}>
          {d.user.name} ({d.specialization ?? "Not Provided"})
          <button onClick={() => book(d._id)}>Book</button>
        </div>
      ))}

      <h2>My Appointments</h2>
      {appointments.map((a) => (
        <div key={a._id}>{a.date} with {a.doctor?.user?.name} : Status - {a.status}</div>
      ))}
    </div>
  );
}
