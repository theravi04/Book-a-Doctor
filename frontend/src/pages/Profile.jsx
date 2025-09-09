import { useEffect, useState } from "react";
import { request } from "../api/api";
import { getAuth } from "../auth";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      let endpoint = "";
      if (auth.user.role === "patient") endpoint = "/profile/patient";
      else if (auth.user.role === "doctor") endpoint = "/profile/doctor";
      else if (auth.user.role === "admin") endpoint = "/profile/admin";

      const data = await request(endpoint, "GET", null, auth.token);
      setProfile(data);
    })();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Role:</b> {profile.role}</p>

      {profile.role === "doctor" && (
        <p><b>Specialization:</b> {profile.specialization}</p>
      )}
    </div>
  );
}
