import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import Footer from './components/Footer';
import PriceComparison from './components/PriceComparison';

const App: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [searchParams, setSearchParams] = useState({
    medication: '',
    dosage: '',
    quantity: 30
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Common medications for suggestions
  const commonMedications = [
    'Ibuprofen 200mg',
    'Ibuprofen 400mg',
    'Atorvastatin 10mg',
    'Atorvastatin 20mg',
    'Omeprazole 20mg',
    'Metformin 500mg',
    'Paracetamol 500mg'
  ];

  const handleSearch = (query: string) => {
    // Basic input validation
    if (!query.trim()) return;
    
    // Parse the query into medication and dosage
    const parts = query.split(' ');
    const medication = parts[0];
    const dosage = parts.slice(1).join(' ');

    // Update search parameters
    const newParams = {
      medication,
      dosage,
      quantity: 30 // Default quantity
    };
    
    setSearchParams(newParams);
    setShowComparison(true);
    
    // Add to search history (limit to 5 items)
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)];
      return newHistory.slice(0, 5);
    });
  };

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowComparison(false);
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showComparison && target.classList.contains('modal-backdrop')) {
        setShowComparison(false);
      }
    };

    if (showComparison) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showComparison]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <HeroSection 
            onSearch={handleSearch} 
            searchHistory={searchHistory}
            commonMedications={commonMedications}
          />
          
          {/* Price Comparison Modal */}
          {showComparison && (
            <div
              className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                <PriceComparison
                  medication={searchParams.medication}
                  dosage={searchParams.dosage}
                  quantity={searchParams.quantity}
                  onClose={() => setShowComparison(false)}
                />
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;