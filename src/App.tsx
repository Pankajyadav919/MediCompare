import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import PriceComparison from './components/PriceComparison';
import FAQSection from './components/FAQSection';
import ElegantCardCollection from './components/ElegantCardCollection';
import AboutPage from './components/About';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import PremiumLandingPage from './components/Landing';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [searchParams, setSearchParams] = useState({
    medication: '',
    dosage: '',
    quantity: 30
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

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
    if (!query.trim()) return;

    const parts = query.split(' ');
    const medication = parts[0];
    const dosage = parts.slice(1).join(' ');

    const newParams = {
      medication,
      dosage,
      quantity: 30
    };

    setSearchParams(newParams);
    setShowComparison(true);

    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)];
      return newHistory.slice(0, 5);
    });
  };

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
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar2 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <HeroSection
                      onSearch={handleSearch}
                      searchHistory={searchHistory}
                      commonMedications={commonMedications}
                    />

                    {fetchedData && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded m-4 text-sm">
                        <strong>Fetched Data:</strong>
                        <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
                      </div>
                    )}

                    {fetchError && (
                      <div className="p-4 bg-red-100 border border-red-400 rounded m-4 text-red-700">
                        Error fetching data: {fetchError}
                      </div>
                    )}

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

                    <ElegantCardCollection />
                    <PremiumLandingPage/>
                    <FAQSection />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUpPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
