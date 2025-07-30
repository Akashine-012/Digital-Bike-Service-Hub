import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8 md:p-10 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-600 mb-6 animate-fade-in-down">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue booking and managing your bike services.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
