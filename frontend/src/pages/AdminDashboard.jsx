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
    <div>
      <h2>All Users</h2>
      {users.map((u) => <div key={u._id}>{u.name} ({u.role})</div>)}

      <h2>All Doctors</h2>
      {doctors.map((d) => <div key={d._id}>{d.user.name} - {d.specialization}</div>)}

      <h2>All Appointments</h2>
      {appointments.map((a) => (
        <div key={a._id}>{a.date} - {a.patient?.name} with Dr {a.doctor?.user?.name}</div>
      ))}
    </div>
  );
}
