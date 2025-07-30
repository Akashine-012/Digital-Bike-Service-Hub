import { useEffect, useState } from "react";
import API from "../api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const role = localStorage.getItem("role");

  const fetchBookings = async () => {
    try {
      const endpoint = role === "owner" ? "/bookings" : "/bookings/my";
      const res = await API.get(endpoint);
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      await fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "accepted":
        return "bg-blue-200 text-blue-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      case "ready":
        return "bg-purple-200 text-purple-800";
      case "completed":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-800 underline underline-offset-8">
        {role === "owner" ? "All Customer Bookings" : "My Bookings"}
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 border"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-gray-800">
                  {b.service?.name || "Service Name"}
                </h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(
                    b.status
                  )}`}
                >
                  {b.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-600 mb-2">
                <strong>Date:</strong>{" "}
                {new Date(b.date).toLocaleDateString("en-IN")}
              </p>

              {role === "owner" && b.customer && (
                <div className="text-gray-600 mb-4">
                  <p>
                    <strong>Customer:</strong> {b.customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {b.customer.email}
                  </p>
                </div>
              )}

              {role === "owner" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {["pending", "accepted", "rejected", "ready", "completed"].map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(b._id, s)}
                        disabled={b.status === s}
                        className={`px-4 py-1 rounded text-sm font-medium transition ${
                          b.status === s
                            ? "bg-green-300 text-white cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Mark as {s}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
