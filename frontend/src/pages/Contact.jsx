import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import ChatbotIcon from '../components/ChatbotIcon';

// Define color palette
const colors = {
  backgroundLight: '#f9f9f9', // Light background
  textDark: '#1a1a1a', // Dark text
  accent: '#004aad', // Accent color
  parhoGreen: '#006400', // Parho Pakistan green accent
};

export default function Contact() {
  // State to hold the form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    console.log(formData); // Print form data to console
  };

  return (
    <div>
      <NavBar />
      <section
        className="bg-light dark:bg-dark"
        id="contact"
        style={{ backgroundColor: colors.backgroundLight }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <p
                className="text-base font-semibold uppercase tracking-wide"
                style={{ color: colors.parhoGreen }}
              >
                Contact
              </p>
              <h2
                className="font-heading mb-4 font-bold tracking-tight text-3xl sm:text-5xl"
                style={{ color: colors.textDark }}
              >
                Get in Touch with Parho Pakistan
              </h2>
              <p
                className="mx-auto mt-4 max-w-3xl text-xl"
                style={{ color: colors.textDark }}
              >
                Join us in shaping the future of education in Pakistan.
              </p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p
                  className="mt-3 mb-12 text-lg"
                  style={{ color: colors.textDark }}
                >
                  Parho Pakistan is dedicated to improving access to quality
                  education in Pakistan. Whether you're looking to partner,
                  volunteer, or have questions, we are here to help!
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded"
                      style={{
                        backgroundColor: colors.parhoGreen,
                        color: '#fff',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3
                        className="mb-2 text-lg font-medium leading-6"
                        style={{ color: colors.textDark }}
                      >
                        Our Address
                      </h3>
                      <p style={{ color: colors.textDark }}>
                        1230 Maecenas Street, Islamabad, Pakistan
                      </p>
                      <p style={{ color: colors.textDark }}>Pakistan</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded"
                      style={{
                        backgroundColor: colors.parhoGreen,
                        color: '#fff',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3
                        className="mb-2 text-lg font-medium leading-6"
                        style={{ color: colors.textDark }}
                      >
                        Contact
                      </h3>
                      <p style={{ color: colors.textDark }}>
                        Mobile: +92 300 123 4567
                      </p>
                      <p style={{ color: colors.textDark }}>
                        Mail: info@parhopakistan.org
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded"
                      style={{
                        backgroundColor: colors.parhoGreen,
                        color: '#fff',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3
                        className="mb-2 text-lg font-medium leading-6"
                        style={{ color: colors.textDark }}
                      >
                        Working hours
                      </h3>
                      <p style={{ color: colors.textDark }}>
                        Monday - Friday: 08:00 - 17:00
                      </p>
                      <p style={{ color: colors.textDark }}>
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                className="card h-fit max-w-6xl p-5 md:p-12"
                id="form"
                style={{ backgroundColor: '#fff', color: colors.textDark }}
              >
                <h2 className="mb-4 text-2xl font-bold">
                  Ready to Get Started?
                </h2>
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      >
                        Your Name
                      </label>
                      <input
                        style={{
                          backgroundColor: colors.backgroundLight,
                          color: colors.textDark,
                        }}
                        type="text"
                        id="name"
                        autoComplete="given-name"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      >
                        Your Email
                      </label>
                      <input
                        style={{
                          backgroundColor: colors.backgroundLight,
                          color: colors.textDark,
                        }}
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"
                      >
                        Your Message
                      </label>
                      <textarea
                        style={{
                          backgroundColor: colors.backgroundLight,
                          color: colors.textDark,
                        }}
                        id="textarea"
                        name="message"
                        cols="30"
                        rows="5"
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 font-xl rounded-md"
                      style={{
                        backgroundColor: colors.parhoGreen,
                        color: '#fff',
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChatbotIcon />
      <BackToTopButton />
      <Footer />
    </div>
  );
}
