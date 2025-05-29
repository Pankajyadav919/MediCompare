import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How Does Medicompare Work?",
      answer: (
        <p>
          We, <strong>Medicompare</strong> helps you <strong>compare prices, availability, and buy options</strong> of medicines from various online pharmacies, all in one place.
        </p>
      )
    },
    {
      question: "Do You Deliver Medicines?",
      answer: (
        <p>
          No, we do not deliver medicines. <strong>Medicompare</strong> is a medicine comparison engine that helps you find the best prices, offers, and availability from various trusted online pharmacies.
          Once you choose a pharmacy, we redirect you to their official website to complete your purchase directly with them.
        </p>
      )
    },
    {
      question: "What is a Price Alert?",
      answer: (
        <p>
          <strong>Price Alert</strong> is a smart feature that <strong>notifies you when the price of a medicine drops</strong> on any of the websites we compare.
        </p>
      )
    },
    {
      question: "How often are pharmacy prices and ratings updated?",
      answer: (
        <p>
          We update pharmacy prices and user ratings regularly to ensure you get the most accurate and current information. This helps you make the best choice based on up-to-date deals and trusted reviews.
        </p>
      )
    },
    {
      question: "How Can I Know Which Pharmacies Are Trusted?",
      answer: (
        <p>
          To help you find trusted pharmacies, we show user ratings, reviews, and verified badges based on service quality. After your purchase, you can rate your experience, which helps other users make informed decisions. Trust is built by the community, and your feedback plays a key role.
        </p>
      )
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center mb-10 pb-6 border-b border-[#D4AF37]">
          <h1 className="font-serif text-4xl font-bold text-[#0A2463] mb-2">
            Frequently Asked Questions
          </h1>
          <p className="italic text-gray-600">
            Your Queries, Elegantly Answered
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'border-[#D4AF37]' : 'border-gray-200'
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-[#0A2463] text-left">
                  {item.question}
                </h3>
                <FaChevronDown 
                  className={`text-[#D4AF37] ml-2 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 text-gray-700">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
