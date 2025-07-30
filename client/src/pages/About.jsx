export default function About() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-tr from-purple-100 via-white to-yellow-100 p-6 flex flex-col items-center justify-center">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse delay-2000"></div>

      {/* Content */}
      <div className="z-10 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-6 drop-shadow-md">
          🛠️ About Us
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed animate-fade-in">
          We are passionate about bikes and even more passionate about our customers. 
          Our service center is built with trust, precision, and speed at its core.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 animate-fade-in delay-500">
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">⏱️ Fast Service</h3>
            <p className="text-gray-600">Quick and efficient bike servicing so you’re back on the road in no time.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-green-600 mb-2">🧰 Expert Technicians</h3>
            <p className="text-gray-600">Our team is certified and experienced to handle all kinds of two-wheelers.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">💬 Transparent Support</h3>
            <p className="text-gray-600">Stay informed throughout your service process with real-time updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
