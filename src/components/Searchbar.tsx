import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHistory, faFire } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  popularSuggestions?: string[];
  searchHistory?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  popularSuggestions = [], 
  searchHistory = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Combine filtered suggestions from history and popular
    const suggestions = [
      ...searchHistory.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())),
      ...popularSuggestions.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !searchHistory.includes(s)
      )
    ].slice(0, 5);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && showSuggestions && suggestions.length > 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Combine and filter suggestions
  const filteredHistory = searchHistory
    .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 3);
    
  const filteredPopular = popularSuggestions
    .filter(s => 
      s.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !searchHistory.includes(s)
    )
    .slice(0, 3);

  return (
    <div className="relative max-w-2xl mx-auto" ref={searchRef}>
      <form 
        onSubmit={handleSearch} 
        className="search-container rounded-full px-1 py-1 shadow-gold-lg bg-white"
      >
        <div className="flex items-center">
          <div className="search-icon ml-2 text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            type="text"
            className="search-input flex-grow py-4 px-4 rounded-full focus:outline-none bg-transparent"
            placeholder="Search for medicines (e.g. Ibuprofen 200mg)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={showSuggestions}
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-gold to-dark-gold text-white rounded-full px-6 py-3 mr-1 font-medium hover:bg-amber-600 transition-all transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </form>

      {showSuggestions && (filteredHistory.length > 0 || filteredPopular.length > 0) && (
        <div 
          className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200"
          role="listbox"
        >
          {filteredHistory.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-1 text-xs font-semibold text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faHistory} className="mr-2" />
                Recent Searches
              </div>
              {filteredHistory.map((suggestion, index) => (
                <div
                  key={`history-${index}`}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                    activeSuggestion === index ? 'bg-gray-100' : ''
                  }`}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setActiveSuggestion(index)}
                  role="option"
                  aria-selected={activeSuggestion === index}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          
          {filteredPopular.length > 0 && (
            <div className="py-2 border-t border-gray-100">
              <div className="px-4 py-1 text-xs font-semibold text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faFire} className="mr-2" />
                Popular Medicines
              </div>
              {filteredPopular.map((suggestion, index) => (
                <div
                  key={`popular-${index}`}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                    activeSuggestion === index + filteredHistory.length ? 'bg-gray-100' : ''
                  }`}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setActiveSuggestion(index + filteredHistory.length)}
                  role="option"
                  aria-selected={activeSuggestion === index + filteredHistory.length}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;