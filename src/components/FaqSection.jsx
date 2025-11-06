import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

     const faqs = [
    {
      question: "How do I create my profile?",
      answer:
        "Click on the ‘Register’ button on the top-right corner, fill out your basic details, and your profile will be created instantly.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, we strictly maintain user privacy. Your data is encrypted and never shared without your consent.",
    },
    {
      question: "How can I contact another member?",
      answer:
        "If you have a premium membership, you can directly send messages or express interest in their profile.",
    },
    {
      question: "Can I upgrade my membership later?",
      answer:
        "Of course! You can upgrade anytime from your dashboard’s Membership page.",
    },
  ];

    return (
        <div>
             <section className=" py-16 px-4 ">
      <div className=" text-center mb-10">
        <h2 className="text-3xl font-bold text-cyan-500">Frequently Asked Questions</h2>
        <p className=" mt-2">
          Find answers to some of the most common questions about our Matrimony platform.
        </p>
      </div>

      <div className=" space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-pink-200 rounded-xl bg-gray-300 shadow-sm"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-gray-900"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-800">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
        </div>
    );
};

export default FaqSection;