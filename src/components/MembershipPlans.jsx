import React from 'react';

const MembershipPlans = () => {
    const plans = [
  {
    name: "Free Plan",
    price: "৳ 0 / month",
    features: [
      "Create your profile",
      "Browse limited profiles",
      "Basic matchmaking",
    ],
    color: "border-gray-300 shadow-cyan-300",
  },
  {
    name: "Premium Plan",
    price: "৳ 499 / month",
    features: [
      "Unlimited profile views",
      "Direct messaging",
      "Priority match suggestions",
    ],
    color: "border-gray-300 shadow-cyan-300",
  },
  {
    name: "Elite Plan",
    price: "৳ 999 / month",
    features: [
      "VIP matchmaking support",
      "Top profile visibility",
      "Personal match consultant",
    ],
    color: "border-gray-300 shadow-cyan-300",
  },
];

    return (
        <div>
             <section className="bg-gray-700 rounded-2xl py-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-cyan-500">Choose Your Plan</h2>
        <p className=" mt-2">
          Find the perfect plan that fits your journey to love 💕
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`border ${plan.color} rounded-2xl shadow-md p-8 flex flex-col items-center bg-gray-800 hover:shadow-xl transition`}
          >
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="text-xl text-indigo-600 font-bold mt-2">{plan.price}</p>

            <ul className="mt-6 space-y-2 justify-baseline items-start">
              {plan.features.map((f, idx) => (
                <li key={idx}>✅ {f}</li>
              ))}
            </ul>

            <button className="mt-6 bg-indigo-500 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-medium transition">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
        </div>
    );
};

export default MembershipPlans;