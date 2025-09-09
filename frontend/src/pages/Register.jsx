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
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
