import { useEffect, useState } from "react";
import API from "../api";

export default function CustomerDashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services").then((res) => setServices(res.data));
  }, []);

  const bookService = async (serviceId) => {
    const date = prompt("Enter booking date (YYYY-MM-DD):");
    if (!date) return;
    try {
      await API.post("/bookings/book", { serviceId, date });
      alert("Booking requested!");
    } catch (e) {
      alert(e.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
        Customer Dashboard
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-600">Loading services...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {service.description}
              </p>
              <p className="text-lg font-bold text-green-800 mb-4">
                ₹{service.price}
              </p>
              <button
                onClick={() => bookService(service._id)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
