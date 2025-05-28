import React from 'react';
import SearchBar from './Searchbar';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchHistory?: string[];
  commonMedications?: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSearch, 
  searchHistory = [], 
  commonMedications = [] 
}) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Find the Best Prices for Your Medications
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Compare prices from multiple pharmacies and save money on your prescriptions
        </p>
        
        <div className="max-w-3xl mx-auto">
          <SearchBar 
            onSearch={onSearch} 
            searchHistory={searchHistory}
            popularSuggestions={commonMedications}
          />
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-gray-500">Popular:</span>
          {commonMedications.slice(0, 4).map((med, index) => (
            <button
              key={index}
              onClick={() => onSearch(med)}
              className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              {med}
            </button>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-200 opacity-20"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-indigo-200 opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-purple-200 opacity-15"></div>
      </div>
    </section>
  );
};

export default HeroSection;