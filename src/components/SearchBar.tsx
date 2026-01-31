import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { searchSuggestions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  size?: 'default' | 'large';
}

export function SearchBar({ onSearch, className, size = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const recentSearches = ['Indiranagar, Bangalore', 'Koramangala, Bangalore'];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  const isLarge = size === 'large';

  return (
    <div className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            'relative flex items-center rounded-2xl glass border border-border transition-all duration-300',
            isFocused && 'ring-2 ring-primary/30 border-primary/50 shadow-glow',
            isLarge ? 'h-16' : 'h-12'
          )}
        >
          <MapPin
            className={cn(
              'absolute left-4 text-muted-foreground transition-colors',
              isFocused && 'text-primary',
              isLarge ? 'w-6 h-6' : 'w-5 h-5'
            )}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Enter city, area, or locality..."
            className={cn(
              'w-full h-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground',
              isLarge ? 'pl-14 pr-40 text-lg' : 'pl-12 pr-32 text-base'
            )}
          />
          <Button
            type="submit"
            className={cn(
              'absolute right-2 rounded-xl gradient-primary hover:opacity-90 transition-opacity',
              isLarge ? 'h-12 px-6 text-base' : 'h-8 px-4 text-sm'
            )}
          >
            <Search className={cn(isLarge ? 'w-5 h-5 mr-2' : 'w-4 h-4 mr-1')} />
            Analyze
          </Button>
        </div>
      </form>

      {/* Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl glass border border-border shadow-lg overflow-hidden z-50 animate-fade-in">
          {suggestions.length > 0 ? (
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Suggestions
              </p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{suggestion}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent Searches
              </p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{search}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
