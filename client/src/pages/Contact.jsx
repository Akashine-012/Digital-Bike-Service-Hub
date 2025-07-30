export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Get in Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <p className="text-lg text-gray-700 mb-4">
              Have any questions or need help with your bike service booking? Reach out to us!
            </p>
            <div className="space-y-4 text-gray-600">
              <p><strong>📍 Address:</strong> Kongu Engineering College, Perundurai, Tamil Nadu</p>
              <p><strong>📞 Phone:</strong> +91 98765 43210</p>
              <p><strong>✉️ Email:</strong> support@bikeservice.com</p>
              <p><strong>🕒 Working Hours:</strong> Mon - Sat, 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.3326741447576!2d77.60926477502017!3d11.275072249313257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fb5f8aa2505%3A0x4ec83d6bb1d92769!2sKongu%20Engineering%20College!5e0!3m2!1sen!2sin!4v1626178024312!5m2!1sen!2sin"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
