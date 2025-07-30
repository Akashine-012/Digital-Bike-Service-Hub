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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>

      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="font-semibold mb-2">
          {editingServiceId ? "Edit Service" : "Add Service"}
        </h3>
        <input
          className="border p-2 mr-2 mb-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2 mb-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2 w-full"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={createOrUpdateService}
          >
            {editingServiceId ? "Update" : "Add"}
          </button>
          {editingServiceId && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{service.name}</h3>
            <p>{service.description}</p>
            <p className="text-blue-600 font-semibold">₹{service.price}</p>

            <div className="mt-2 flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => startEdit(service)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => deleteService(service._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
