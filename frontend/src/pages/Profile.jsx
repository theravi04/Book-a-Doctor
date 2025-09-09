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

  if (!profile) {
    return (
      <div className="w-full px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            My Profile
          </h2>
          
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
              <div className="w-full sm:w-1/3">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Name
                </label>
              </div>
              <div className="w-full sm:w-2/3 mt-1 sm:mt-0">
                <span className="text-lg font-medium text-gray-900">
                  {profile.name}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
              <div className="w-full sm:w-1/3">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Email
                </label>
              </div>
              <div className="w-full sm:w-2/3 mt-1 sm:mt-0">
                <span className="text-lg text-gray-800">
                  {profile.email}
                </span>
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
              <div className="w-full sm:w-1/3">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Role
                </label>
              </div>
              <div className="w-full sm:w-2/3 mt-1 sm:mt-0">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(profile.role)}`}>
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </span>
              </div>
            </div>

            {/* Specialization (only for doctors) */}
            {profile.role === "doctor" && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-full sm:w-1/3">
                  <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Specialization
                  </label>
                </div>
                <div className="w-full sm:w-2/3 mt-1 sm:mt-0">
                  <span className="text-lg text-gray-800">
                    {profile.specialization || "Not specified"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}