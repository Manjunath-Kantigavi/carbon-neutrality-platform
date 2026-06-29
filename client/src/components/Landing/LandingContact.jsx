import React from 'react';

const LandingContact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact Us</h3>
        <p className="text-lg text-gray-600 text-center mb-8">
          Have questions or need assistance? We're here to help!
        </p>
        <form className="max-w-xl mx-auto grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Email</h4>
            <p className="text-gray-600">
              <a href="mailto:support@coalmine.com" className="hover:text-green-500">
                support@coalmine.com
              </a>
            </p>
          </div>

          {/* Phone */}
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Phone</h4>
            <p className="text-gray-600">+1 234 567 890</p>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-600 hover:text-green-500"
              >
                <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.078v-9.294H9.404v-3.622h2.999V9.29c0-3.013 1.789-4.687 4.603-4.687 1.342 0 2.735.1 3.128.146v3.641h-2.223c-1.742 0-2.232 1.054-2.232 2.137v2.568h4.465l-.708 3.622h-3.757v9.294h7.374c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.206 0 22.675 0z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-600 hover:text-green-500"
              >
                <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M23.444 4.834a9.44 9.44 0 0 1-2.688.735A4.731 4.731 0 0 0 22.897 3a9.392 9.392 0 0 1-3.132 1.195A4.721 4.721 0 0 0 16.616 0c-2.513 0-4.56 2.047-4.56 4.56 0 .356.04.702.116 1.034a13.029 13.029 0 0 1-9.471-4.794 4.558 4.558 0 0 0-.616 2.29c0 1.58.805 2.97 2.033 3.786a4.663 4.663 0 0 1-2.07-.572v.06c0 2.205 1.57 4.056 3.647 4.48a4.734 4.734 0 0 1-2.056.078 4.74 4.74 0 0 0 4.419 3.291A9.423 9.423 0 0 1 1 19.77a13.301 13.301 0 0 0 7.2 2.112c8.643 0 13.37-7.168 13.37-13.37 0-.205 0-.408-.015-.61a9.51 9.51 0 0 0 2.071-2.432z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-600 hover:text-green-500"
              >
                <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.225 0H1.775C.794 0 0 .794 0 1.775v20.451C0 23.206.794 24 1.775 24h20.451c.981 0 1.775-.794 1.775-1.775V1.775C24 .794 23.206 0 22.225 0zM7.275 20.451H3.7V9.391h3.575v11.06zm-1.788-12.56c-1.017 0-1.85-.84-1.85-1.875s.833-1.875 1.85-1.875 1.85.84 1.85 1.875-.833 1.875-1.85 1.875zm11.338 12.56h-3.575v-5.625c0-1.338-.05-3.06-1.876-3.06-1.874 0-2.163 1.463-2.163 2.96v5.725h-3.575V9.391h3.575v1.548h.048c.5-.946 1.72-1.948 3.517-1.948 3.765 0 4.452 2.475 4.452 5.682v5.478z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingContact;
