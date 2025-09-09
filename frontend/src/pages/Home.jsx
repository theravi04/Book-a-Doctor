import { Link } from "react-router-dom";
import { getAuth } from "../auth";

export default function Home() {
  const auth = getAuth();

  return (
    <div>
      <h1>Welcome to Book-a-Doctor</h1>
      {!auth ? (
        <>
          <p>Please login or register to continue.</p>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <p>You are logged in as <b>{auth.user.role}</b>.</p>
          <Link to="/dashboard">Go to Dashboard</Link>
        </>
      )}
    </div>
  );
}
