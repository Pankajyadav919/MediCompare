import React from 'react';
import paracetamol from '../assets/paracetamol.jpg';
import dabur from '../assets/Dabur.jpeg';
import Volini from '../assets/Volini (2).jpeg'
const ElegantCardCollection: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto my-[60px] px-5">
      <div className="text-center mb-[50px]">
        <h2 className="text-[2.5rem] text-[#0a2463] mb-[15px] font-bold relative inline-block">
          Most Frequently Searched
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[80px] h-1 bg-gradient-to-r from-[#e4c870] to-[#f5e6a6] rounded"></span>
        </h2>
        <p className="text-[#5a6a8a] text-[1.1rem] max-w-[600px] mx-auto leading-relaxed">
          Explore our most popular collections loved by customers worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Card 1 */}
        <div className="w-full rounded-[16px] overflow-hidden bg-white shadow-lg transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
          <div className="h-[200px] relative overflow-hidden">
            <img
              src={paracetamol}
              alt="Paracetamol"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-white/90"></div>
          </div>

          <div className="p-5">
            <h3 className="text-[#0a2463] text-xl mb-3 font-semibold relative inline-block">
              Paracetamol
              <span className="absolute bottom-[-6px] left-0 w-[40px] h-0.5 bg-gradient-to-r from-[#e4c870] to-[#f5e6a6] rounded transition-width duration-300 group-hover:w-[60px]"></span>
            </h3>
            <p className="text-[#5a6a8a] text-sm mb-5 leading-normal">
              Paracetamol (also known as acetaminophen) is a commonly used over-the-counter medication.
            </p>

            <div className="flex justify-start">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a2463] text-white font-medium transition-all duration-300 hover:bg-[#1a3a7a] hover:translate-x-1"
              >
                <span>Compare</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full rounded-[16px] overflow-hidden bg-white shadow-lg transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
          <div className="h-[200px] relative overflow-hidden">
            <img
              src={Volini}
              alt="Luxury Perfume"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-white/90"></div>
          </div>

          <div className="p-5">
            <h3 className="text-[#0a2463] text-xl mb-3 font-semibold relative inline-block">
              Volini Spray
              <span className="absolute bottom-[-6px] left-0 w-[40px] h-0.5 bg-gradient-to-r from-[#e4c870] to-[#f5e6a6] rounded transition-width duration-300 group-hover:w-[60px]"></span>
            </h3>
            <p className="text-[#5a6a8a] text-sm mb-5 leading-normal">
              Volini Spray is a widely used topical analgesic in India, designed to provide rapid relief from various types of musculoskeletal pain.
            </p>

            <div className="flex justify-start">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a2463] text-white font-medium transition-all duration-300 hover:bg-[#1a3a7a] hover:translate-x-1"
              >
                <span>Compare</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full rounded-[16px] overflow-hidden bg-white shadow-lg transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
          <div className="h-[200px] relative overflow-hidden">
            <img
              src={dabur}
              alt="Luxury Perfume"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-white/90"></div>
          </div>

          <div className="p-5">
            <h3 className="text-[#0a2463] text-xl mb-3 font-semibold relative inline-block">
              Dabur Honitus
              <span className="absolute bottom-[-6px] left-0 w-[40px] h-0.5 bg-gradient-to-r from-[#e4c870] to-[#f5e6a6] rounded transition-width duration-300 group-hover:w-[60px]"></span>
            </h3>
            <p className="text-[#5a6a8a] text-sm mb-5 leading-normal">
              Dabur Honitus is a range of Ayurvedic remedies formulated to provide relief from cough, cold, and throat irritation.
            </p>

            <div className="flex justify-start">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a2463] text-white font-medium transition-all duration-300 hover:bg-[#1a3a7a] hover:translate-x-1"
              >
                <span>Compare</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElegantCardCollection;
