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
  country?: string;
  state?: string;
  latitude: number;
  longitude: number;
  display_name: string;
  type: string;
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
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const data = await response.json();

      // Filter only villages, but allow fallback if none found
      const villages = data.filter(
        (item: any) => item.type === "village" || item.addresstype === "village"
      );

      const filteredData = villages.length > 0 ? villages : data;

      const results: SearchResult[] = filteredData.map((item: any) => ({
        name: item.display_name.split(",")[0],
        country: item.address?.country,
        state: item.address?.state || item.address?.county,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        display_name: item.display_name,
        type: item.type,
      }));

      // De-duplicate similar entries
      const uniqueResults = results.filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              t.name === v.name &&
              Math.abs(t.latitude - v.latitude) < 0.01 &&
              Math.abs(t.longitude - v.longitude) < 0.01
          ) === i
      );

      console.log("Location search results:", uniqueResults);
      setResults(uniqueResults);
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
                onLocationSelect(
                  result.latitude,
                  result.longitude,
                  `${result.name}, ${result.state || ""}, ${result.country || ""}`
                );
                setResults([]);
                setQuery("");
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-muted/50 transition-colors flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <div className="text-sm flex flex-col">
                <span className="font-medium">{result.name}</span>
                <span className="text-xs text-muted-foreground">
                  {result.state ? `${result.state}, ` : ""}
                  {result.country || ""}
                </span>
              </div>
            </button>
          ))}
        </Card>
      )}
    </div>
  );
}
