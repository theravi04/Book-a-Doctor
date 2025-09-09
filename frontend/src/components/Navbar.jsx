import { Link } from "react-router-dom";
import { getAuth, logout } from "../auth";

export default function Navbar() {
  const auth = getAuth();

  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      {!auth ? (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span>{auth.user.role.toUpperCase()}</span>{" | "}
          <Link to="/profile">Profile</Link>{" | "}
          <button onClick={() => { logout(); window.location = "/"; }}>Logout</button>
        </>
      )}
    </nav>
  );
}
