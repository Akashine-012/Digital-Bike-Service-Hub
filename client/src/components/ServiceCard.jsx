import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service, onBook }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      onBook(service);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h2>
      <p className="text-gray-600 mb-1">Price: ₹{service.price}</p>
      <p className="text-gray-600 mb-1">Duration: {service.duration} hrs</p>
      <p className="text-gray-600 mb-4">Description: {service.description}</p>
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Book Service
      </button>
    </div>
  );
};

export default ServiceCard;
