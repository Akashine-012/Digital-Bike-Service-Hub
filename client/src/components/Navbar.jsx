import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToDashboard = () => {
    if (role === "owner") navigate("/owner-dashboard");
    else if (role === "customer") navigate("/customer-dashboard");
    else navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-pink-600">🚴 BikeService</h1>
      <div className="flex gap-6 items-center">
        <Link className="text-gray-700 hover:text-pink-600" to="/">Home</Link>
        <Link className="text-gray-700 hover:text-pink-600" to="/about">About</Link>
        <Link className="text-gray-700 hover:text-pink-600" to="/contact">Contact</Link>
        {role && (
          <button className="text-gray-700 hover:text-pink-600" onClick={goToDashboard}>Dashboard</button>
        )}
        {role && (
          <Link className="text-gray-700 hover:text-pink-600" to="/bookings">Bookings</Link>
        )}
        {!role ? (
          <>
            <Link className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700" to="/login">Login</Link>
            <Link className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-100" to="/register">Register</Link>
          </>
        ) : (
          <button
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
