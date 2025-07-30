import { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "customer" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-pink-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8 md:p-10 transition duration-300 ease-in-out">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-6 animate-fade-in-down">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Phone Number"
            type="tel"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </div>
  );
}
