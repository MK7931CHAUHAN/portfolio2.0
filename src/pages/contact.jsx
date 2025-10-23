import React, { useState } from "react";
import axios from "axios";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    if (status.type) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Use import.meta.env for Vite
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      const res = await axios.post(
        `${baseUrl}/api/send-email`,
        formData,
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (res.data.success) {
        setStatus({ 
          type: "success", 
          message: res.data.message || "Message sent successfully!" 
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ 
          type: "error", 
          message: res.data.message || "Failed to send message." 
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      
      let errorMessage = "Failed to send message. Please try again.";
      
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        errorMessage = "Cannot connect to server. Please make sure the backend server is running on port 5000.";
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timeout. Please check your internet connection and try again.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-black dark:text-gray-300">
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-black dark:text-gray-300">
              Your Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-black dark:text-gray-300">
            Subject *
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Project Collaboration"
          />
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label htmlFor="message" className="block text-sm font-medium text-black dark:text-gray-300">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Tell me about your project..."
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactSection;