import React from 'react';
import aboutimage from '../assets/aboutimage.jpeg';
import iiitimg from '../assets/collegelogo.jpeg'
const OurStoryPage: React.FC = () => {
  return (
    <div className="bg-[#f5f3ee] text-[#333333] text-lg leading-relaxed overflow-x-hidden">
      {/* Hero Header */}
      <header className="relative text-white text-center py-32 px-4 shadow-xl mb-12 bg-[url('/Images/HangingClothes.jpeg')] bg-cover bg-center before:absolute before:inset-0 before:bg-[rgba(0,51,102,0.85)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#d4af37] after:via-[#f5d78c] after:to-[#d4af37] after:shadow-md">
        <h1 className="relative text-5xl font-bold uppercase tracking-wider animate-fadeInDown bg-gradient-to-r from-[#d4af37] to-[#f5d78c] bg-clip-text text-transparent drop-shadow-md">
          Our Story
        </h1>
        <p className="relative mt-6 max-w-3xl mx-auto text-xl font-light text-white text-opacity-90 animate-fadeInUp">
          Redefining healthcare access with transparency, smart technology, and a vision for informed medical choices
        </p>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* About Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-xl overflow-hidden shadow-2xl h-[500px]">
            <img src={aboutimage} alt="MediCompare Team" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div>
            <h2 className="text-3xl text-[#003366] font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-16 after:h-1 after:bg-[#d4af37]">
              About MEDICOMP
            </h2>
            <p className="mb-6 text-[#555]">
              The idea for MediCompare began with a personal experience. One of our founders bought a common medicine from a nearby pharmacy and later purchased the same medicine from a different store—only to find a significant price difference. What seemed like a small issue revealed a much larger problem: there was no easy way for people to compare medical prices, and patients often ended up paying more simply because they didn't have access to transparent information.
            </p>
            <p className="text-[#555]">
              This moment of realization sparked a bigger mission. Why should healthcare costs be a mystery, especially in a country where affordability is critical? MediCompare was created to solve this problem—to bring price transparency to medicines, diagnostic tests, and treatments across India. By giving people access to accurate, real-time pricing, we aim to empower every patient to make informed decisions and take control of their healthcare journey.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-2 transition-transform">
            <h3 className="text-[#003366] text-xl font-semibold mb-4">Our Mission</h3>
            <p>
              Our mission is to empower individuals with trustworthy, comprehensive data on healthcare pricing—covering diagnostics, consultations, procedures, and medicines—through a reliable digital platform. We strive to partner with hospitals, labs, and pharmacies nationwide to ensure that price transparency becomes a standard, not an exception, in India's medical landscape.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-2 transition-transform">
            <h3 className="text-[#003366] text-xl font-semibold mb-4">Our Vision</h3>
            <p>
              To create a healthcare ecosystem in India where every citizen can make informed, confident decisions by accessing clear, transparent, and real-time information on medical prices and services—bridging the gap between affordability and accessibility in healthcare.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-2 transition-transform">
            <h3 className="text-[#003366] text-xl font-semibold mb-4">Our Values</h3>
            <p>
              We are guided by the principles of transparency, integrity, and innovation. At MediCompare, we believe every individual deserves clear and honest information about healthcare costs. We are committed to empowering users through accessible, unbiased data and continually improving our platform to make medical price comparison simple, fair, and impactful.
            </p>
          </div>
        </section>

        {/* IIIT Info Section */}
        <section className="bg-[#003366] text-white text-center px-4 py-16 rounded-xl my-16">
          <h2 className="text-3xl font-semibold mb-6">Proudly Born at IIIT Sonipat</h2>
          <p className="max-w-3xl mx-auto mb-6">
            MediCompare is a proud innovation originating from the Computer Science and Engineering department of IIIT Sonipat. Our founders developed the initial concept as part of their entrepreneurial journey at this premier technology institute.
          </p>
          <div className="w-40 mx-auto">
            <img src={iiitimg} alt="IIIT Sonipat Logo" className="w-full h-auto" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStoryPage;
