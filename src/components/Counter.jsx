import React from 'react';
import { FaMale, FaFemale, FaUsers } from "react-icons/fa";
import { BsArrowThroughHeart } from "react-icons/bs";
import CountUp from "react-countup";

const Counter = () => {
    const stats = [
    {
      id: 1,
      icon: <BsArrowThroughHeart className="text-4xl text-pink-500" />,
      count: 500,
      label: "Couples Paired",
    },
    {
      id: 2,
      icon: <FaMale className="text-4xl text-blue-500" />,
      count: 300,
      label: "Mens Biodata",
    },
    {
      id: 3,
      icon: <FaFemale className="text-4xl text-pink-500" />,
      count: 433,
      label: "Womans Biodata",
    },
    {
      id: 4,
      icon: <FaUsers className="text-4xl text-gray-500" />,
      count: 3843,
      label: "Registered Users",
    },
  ];
    return (
        <div>
            <div className="bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center bg-slate-800 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            {item.icon}
            <h2 className="text-4xl font-bold text-cyan-400 mt-3">
              <CountUp start={0} end={item.count} duration={300} separator="," />
            </h2>
            <p className="text-gray-300 mt-1 uppercase tracking-wide text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default Counter;