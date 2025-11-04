import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, WeatherData } from "@/lib/weatherApi";
import { useState, useEffect } from "react";

export function useWeather() {
  const [location, setLocation] = useState({ 
    latitude: 52.3676, 
    longitude: 4.9041, 
    name: "Amsterdam, Netherlands" 
  });

  const getUserLocation = async () => {
    return new Promise<void>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            try {
              // Use Nominatim for reverse geocoding
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
              );
              if (!response.ok) {
                throw new Error('Failed to fetch location data');
              }
              const data = await response.json();
              const locationName = data.display_name.split(',').slice(0, 3).join(',');
              
              setLocation({
                latitude: lat,
                longitude: lon,
                name: locationName,
              });
              resolve();
            } catch (error) {
              console.error("Reverse geocoding error:", error);
              reject(error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  // Define the query FIRST so refetch is available
  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ["weather", location.latitude, location.longitude],
    queryFn: () => {
      console.log("Fetching weather for:", location.latitude, location.longitude);
      return fetchWeatherData(location.latitude, location.longitude);
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 2,
    staleTime: 0,
  });

  // Request location on mount
  useEffect(() => {
    getUserLocation()
      .then(() => {
        console.log("Location obtained, triggering refetch");
        // Give React a moment to update the queryKey
        setTimeout(() => refetch(), 100);
      })
      .catch(() => {
        // Silently fail and keep default location
        console.log("Using default location");
      });
  }, []);

  return { data, isLoading, error, location, setLocation, getUserLocation, refetch };
}
