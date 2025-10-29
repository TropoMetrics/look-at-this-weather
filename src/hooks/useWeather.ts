import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, WeatherData } from "@/lib/weatherApi";
import { useState, useEffect } from "react";

export function useWeather() {
  const [location, setLocation] = useState({ latitude: 52.6309, longitude: 1.2974 }); // Norwich default

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Using default location (Norwich):", error);
        }
      );
    }
  }, []);

  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ["weather", location.latitude, location.longitude],
    queryFn: () => fetchWeatherData(location.latitude, location.longitude),
    refetchInterval: 600000, // Refetch every 10 minutes
  });

  return { data, isLoading, error, location };
}
