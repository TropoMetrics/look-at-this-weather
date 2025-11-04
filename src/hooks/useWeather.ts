import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, WeatherData } from "@/lib/weatherApi";
import { useState, useEffect } from "react";

export function useWeather() {
  const [location, setLocation] = useState({ 
    latitude: 52.6309, 
    longitude: 1.2974, 
    name: "Norwich, UK" 
  });

  const getUserLocation = async () => {
    return new Promise<void>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Reverse geocode to get location name
            try {
              const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1`
              );
              const data = await response.json();
              const locationName = data.results?.[0]
                ? `${data.results[0].name}${data.results[0].admin1 ? ', ' + data.results[0].admin1 : ''}${data.results[0].country ? ', ' + data.results[0].country : ''}`
                : "Your Location";
              
              setLocation({
                latitude: lat,
                longitude: lon,
                name: locationName,
              });
            } catch (error) {
              console.log("Reverse geocoding error:", error);
              setLocation({
                latitude: lat,
                longitude: lon,
                name: "Your Location",
              });
            }
            resolve();
          },
          (error) => {
            console.log("Geolocation error:", error);
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  // Request location on mount
  useEffect(() => {
    getUserLocation()
      .then(() => {
        // Immediately fetch weather for the new location
        refetch();
      })
      .catch(() => {
        // Silently fail and keep default location
        console.log("Using default location");
      });
  }, []);

  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ["weather", location.latitude, location.longitude],
    queryFn: () => fetchWeatherData(location.latitude, location.longitude),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 2,
    staleTime: 0,
  });

  return { data, isLoading, error, location, setLocation, getUserLocation, refetch };
}
