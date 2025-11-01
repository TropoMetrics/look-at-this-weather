import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, WeatherData } from "@/lib/weatherApi";
import { useState, useEffect } from "react";

export function useWeather() {
  const [location, setLocation] = useState({ 
    latitude: 52.6309, 
    longitude: 1.2974, 
    name: "Norwich, UK" 
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            name: "Your Location",
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    }
  };

  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ["weather", location.latitude, location.longitude],
    queryFn: () => fetchWeatherData(location.latitude, location.longitude),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 2,
    staleTime: 0,
  });

  return { data, isLoading, error, location, setLocation, getUserLocation, refetch };
}
