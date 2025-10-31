import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
}

interface SearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      console.log("Location search results:", data);
      setResults(data.results || []);
    } catch (error) {
      console.error("Error searching location:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isSearching} size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {results.length > 0 && (
        <Card className="p-2 space-y-1">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => {
                console.log("Selected location:", result);
                onLocationSelect(result.lat, result.lon, `${result.name}, ${result.country}`);
                setResults([]);
                setQuery("");
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-muted/50 transition-colors flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">
                {result.name}
                {result.state && `, ${result.state}`}
                {`, ${result.country}`}
              </span>
            </button>
          ))}
        </Card>
      )}
    </div>
  );
}
