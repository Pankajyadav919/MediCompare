// PriceComparison.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { LocalPharmacy, LocalShipping, MonetizationOn } from '@mui/icons-material';

interface PharmacyResult {
  id: string;
  name: string;
  price: number;
  distance?: number;
  isOnline: boolean;
  hasDiscount: boolean;
  estimatedSavings?: number;
}

interface PriceComparisonProps {
  medication: string;
  dosage: string;
  quantity: number;
  onClose: () => void;
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ medication, dosage, quantity, onClose }) => {
  const [results, setResults] = useState<PharmacyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock pharmacy data
  const pharmacyNames = [
    'Medi Cure',
    'One Bharat Pharmacy',
    'Pharm Easy',
    'Medivik',
    'Practo',
    'Apollo',
    'True Meds',
    'Netmeds',
    '1mg',
    'HealthKart'
  ];

  // Enhanced mock medication database with multiple variations
  const medicationDatabase = [
    { name: "Atorvastatin", form: "tab-cap", strength: "20 mg", price: 0.0439 },
    { name: "Atorvastatin", form: "tab-cap", strength: "20mg", price: 0.0439 },
    { name: "Atorvastatin", form: "tab-cap", strength: "10 mg", price: 0.0533 },
    { name: "Atorvastatin", form: "tab-cap", strength: "10mg", price: 0.0533 },
    { name: "Ibuprofen", form: "tab-cap", strength: "200 mg", price: 0.0193 },
    { name: "Ibuprofen", form: "tab-cap", strength: "200mg", price: 0.0193 },
    { name: "Ibuprofen", form: "tab-cap", strength: "400 mg", price: 0.0148 },
    { name: "Ibuprofen", form: "tab-cap", strength: "400mg", price: 0.0148 },
    { name: "Omeprazole", form: "tab-cap", strength: "20 mg", price: 0.0191 },
    { name: "Omeprazole", form: "tab-cap", strength: "20mg", price: 0.0191 },
    { name: "Metformin", form: "tab-cap", strength: "500 mg", price: 0.0262 },
    { name: "Metformin", form: "tab-cap", strength: "500mg", price: 0.0262 },
    { name: "Paracetamol", form: "tab-cap", strength: "500 mg", price: 0.0085 },
    { name: "Paracetamol", form: "tab-cap", strength: "500mg", price: 0.0085 },
  ];

  React.useEffect(() => {
    console.log('Searching for:', { medication, dosage, quantity });
    
    const timer = setTimeout(() => {
      const mockResults = generatePriceResults(medication, dosage, quantity);
      setResults(mockResults);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [medication, dosage, quantity]);

  const normalizeString = (str: string) => str.toLowerCase().replace(/\s+/g, '');

  const generatePriceResults = (medication: string, dosage: string, quantity: number): PharmacyResult[] => {
    const baseMed = medicationDatabase.find(med => 
      normalizeString(med.name) === normalizeString(medication) && 
      normalizeString(med.strength) === normalizeString(dosage)
    );

    if (!baseMed) {
      console.log('No match found for:', { 
        medication, 
        dosage,
        available: medicationDatabase
          .filter(med => normalizeString(med.name) === normalizeString(medication))
          .map(m => m.strength)
      });
      return [];
    }

    const basePricePerUnit = baseMed.price;
    const basePrice = basePricePerUnit * quantity * 85; // Convert to INR
    
    // Generate prices in descending order first
    const pricePoints = [
      basePrice * 0.7,  // +20%
      basePrice * 0.8,  // +15%
      basePrice * 0.9,  // +10%
      basePrice,        // Base price
      basePrice * 1.1,  // -10%
      basePrice * 1.15, // -20%
      basePrice * 1.2   // -30%
    ];

    // Shuffle pharmacy names
    const shuffledPharmacies = [...pharmacyNames]
      .sort(() => 0.5 - Math.random());

    return pricePoints.map((price, index) => {
      const isOnline = Math.random() > 0.5; // Randomly assign online status
      const discountThreshold = isOnline ? 0.3 : 0.5;
      
      return {
        id: `pharmacy-${index}`,
        name: shuffledPharmacies[index],
        price: parseFloat(price.toFixed(2)),
        distance: isOnline ? undefined : (0.5 + Math.random() * 5),
        isOnline,
        hasDiscount: Math.random() > discountThreshold,
        estimatedSavings: isOnline ? 
          parseFloat((basePrice - price).toFixed(2)) : 
          Math.random() > 0.5 ? parseFloat((basePrice * 0.1).toFixed(2)) : undefined
      };
    }).sort((a, b) => a.price - b.price); // Sort by price ascending
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <CircularProgress className="text-primary" />
        <Typography variant="body1" className="mt-4 text-text-dark">
          Searching for the best prices...
        </Typography>
      </div>
    );
  }

  if (results.length === 0) {
    const availableOptions = medicationDatabase
      .filter(med => normalizeString(med.name) === normalizeString(medication))
      .map(med => med.strength);

    return (
      <div className="p-8 text-center">
        <Typography variant="h6" className="text-text-dark">
          No prices found for {medication} {dosage}
        </Typography>
        <Typography variant="body1" className="text-text-light mt-2">
          Try adjusting your search criteria
        </Typography>
        {availableOptions.length > 0 && (
          <Typography variant="body2" className="text-text-light mt-4">
            Available dosages: {availableOptions.join(', ')}
          </Typography>
        )}
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="text-primary font-bold">
          Prices for {medication} {dosage} (Qty: {quantity})
        </Typography>
        <button 
          onClick={onClose}
          className="text-gold hover:text-dark-gold transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <TableContainer component={Paper} className="shadow-gold w-full">
        <Table sx={{ minWidth: 650 }} aria-label="price comparison table">
          <TableHead className="bg-primary">
            <TableRow>
              <TableCell className="text-white font-bold min-w-[200px]">Pharmacy</TableCell>
              <TableCell align="right" className="text-white font-bold min-w-[120px]">Price (₹)</TableCell>
              <TableCell align="right" className="text-white font-bold min-w-[120px]">Savings</TableCell>
              <TableCell align="right" className="text-white font-bold min-w-[120px]">Distance</TableCell>
              <TableCell align="center" className="text-white font-bold min-w-[150px]">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((pharmacy) => (
              <TableRow key={pharmacy.id} className="hover:bg-accent/10">
                <TableCell component="th" scope="row" className="min-w-[200px]">
                  <div className="flex items-center">
                    {pharmacy.isOnline ? 
                      <LocalShipping className="text-secondary mr-2" /> : 
                      <LocalPharmacy className="text-primary mr-2" />
                    }
                    <span>{pharmacy.name}</span>
                    {pharmacy.hasDiscount && <MonetizationOn className="text-gold ml-2" />}
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[120px]">
                  <Typography variant="body1" className="font-bold">
                    ₹{pharmacy.price.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right" className="min-w-[120px]">
                  {pharmacy.estimatedSavings && pharmacy.estimatedSavings > 0 && (
                    <Typography variant="body2" className="text-green-600">
                      Save ₹{pharmacy.estimatedSavings.toFixed(2)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right" className="min-w-[120px]">
                  {pharmacy.distance ? `${pharmacy.distance.toFixed(1)} mi` : 'Online'}
                </TableCell>
                <TableCell align="center" className="min-w-[150px]">
                  <Button 
                    variant="outlined" 
                    size="small"
                    className="border-gold text-gold hover:bg-gold/10"
                    fullWidth
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PriceComparison;