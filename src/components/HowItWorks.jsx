import React from 'react';
import { FaUserPlus, FaSearch, FaHeart, FaRing } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
    {
      icon: <FaUserPlus className="text-pink-600 text-4xl mb-4" />,
      title: "Create Your Profile",
      desc: "Sign up and share your details to create your biodata.",
    },
    {
      icon: <FaSearch className="text-blue-600 text-4xl mb-4" />,
      title: "Search & Filter",
      desc: "Browse profiles using age, division, and other filters.",
    },
    {
      icon: <FaHeart className="text-red-600 text-4xl mb-4" />,
      title: "Connect & Request",
      desc: "Add favourites and request contact information.",
    },
    {
      icon: <FaRing className="text-green-600 text-4xl mb-4" />,
      title: "Success Story",
      desc: "Start your new journey and share your success with us.",
    },
  ];
    return (
        <div>
            <section className="py-16 bg-gray-800 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How It <span className="text-pink-600">Works</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
        </div>
    );
};

export default HowItWorks;