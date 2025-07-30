import { useState, useEffect } from "react";
import API from "../api";

export default function OwnerDashboard() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  };

  const createOrUpdateService = async () => {
    try {
      if (editingServiceId) {
        await API.put(`/services/${editingServiceId}`, form);
        alert("Service updated successfully");
      } else {
        await API.post("/services", form);
        alert("Service added successfully");
      }
      setForm({ name: "", description: "", price: "" });
      setEditingServiceId(null);
      fetchServices();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await API.delete(`/services/${id}`);
        alert("Service deleted");
        fetchServices();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const startEdit = (service) => {
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
    });
    setEditingServiceId(service._id);
  };

  const cancelEdit = () => {
    setForm({ name: "", description: "", price: "" });
    setEditingServiceId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Owner Dashboard
      </h2>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-700 text-center">
          {editingServiceId ? "Edit Service" : "Add New Service"}
        </h3>

        <input
          className="w-full border p-2 mb-3 rounded-lg"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="w-full border p-2 mb-3 rounded-lg"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          className="w-full border p-2 mb-4 rounded-lg"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <div className="flex gap-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            onClick={createOrUpdateService}
          >
            {editingServiceId ? "Update" : "Add"}
          </button>
          {editingServiceId && (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-600">Loading services...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              <p className="text-lg font-bold text-blue-800 mb-4">
                ₹{service.price}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(service)}
                  className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteService(service._id)}
                  className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
