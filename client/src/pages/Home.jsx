export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center p-6">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-2000"></div>

      {/* Content */}
      <div className="z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
          🚴‍♂️ Grand Opening!
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6 animate-fade-in">
          Welcome to Bike Service Center
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 px-4 animate-fade-in delay-500">
          Book services, track your bike status, and experience the best in bike maintenance with comfort and speed.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 animate-fade-in delay-700"
        >
          Get Started
        </a>
      </div>

      {/* Illustration */}
      <div className="mt-12 z-10 animate-fade-in delay-1000">
        <img
          src="/images/bike-service-illustration.svg"
          alt="Bike Service"
          className="w-full max-w-md md:max-w-xl mx-auto drop-shadow-xl"
        />
      </div>
    </div>
  );
}
