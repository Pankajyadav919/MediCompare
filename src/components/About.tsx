import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="font-montserrat bg-[#f5f3ee] text-[#333] overflow-x-hidden">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-r from-[#0a2342] to-[#1a3a6a] text-white py-32 px-8 text-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] z-0"></div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#f5d78c] bg-clip-text text-transparent drop-shadow-lg animate-fadeInDown">
          Our Story
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed relative z-10 text-white/90 font-light tracking-wider opacity-0 animate-fadeInUp delay-300">
          Redefining healthcare access with transparency, smart technology, and a vision for informed medical choices
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f5d78c] to-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* About Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-xl overflow-hidden shadow-lg h-[500px]">
            <img 
              src="/Images/Aboutimage.jpg" 
              alt="MEDICOMP Service"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl text-[#003366] mb-6 font-bold relative inline-block">
              About MEDICOMP
              <span className="absolute bottom-[-10px] left-0 w-16 h-0.5 bg-[#d4af37]"></span>
            </h2>
            <p className="text-[#555] text-lg mb-6 leading-relaxed">
              The idea for MediCompare began with a personal experience...
            </p>
            <p className="text-[#555] text-lg leading-relaxed">
              This moment of realization sparked a bigger mission...
            </p>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          {[
            {
              title: 'Our Mission',
              icon: (
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              ),
              text: 'Our mission is to empower individuals with trustworthy...'
            },
            {
              title: 'Our Vision',
              icon: (
                <>
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5..." />
                </>
              ),
              text: 'To create a healthcare ecosystem in India...'
            },
            {
              title: 'Our Values',
              icon: (
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364..." />
              ),
              text: 'We are guided by the principles of transparency...'
            }
          ].map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center transition-transform duration-300 hover:-translate-y-3">
              <div className="text-[#d4af37] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {section.icon}
                </svg>
              </div>
              <h3 className="text-2xl text-[#003366] mb-4 font-bold">{section.title}</h3>
              <p className="text-[#555] leading-relaxed">{section.text}</p>
            </div>
          ))}
        </section>

        {/* IIIT Sonipat */}
        <section className="bg-[#003366] text-white py-16 px-8 text-center rounded-xl my-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Proudly Born at IIIT Sonipat</h2>
          <p className="max-w-4xl mx-auto mb-8 text-lg opacity-90">
            MediCompare is a proud innovation originating...
          </p>
          <div className="w-40 mx-auto">
            <img src="/Images/iiitsonipat.jpeg" alt="IIIT Sonipat Logo" className="w-full h-auto" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
