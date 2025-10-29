import CurrentWeather from "@/components/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast";
import WeeklyForecast from "@/components/WeeklyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import { useWeather } from "@/hooks/useWeather";
import { MapPin, Loader2 } from "lucide-react";

const Index = () => {
  const { data, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Error loading weather</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-semibold">Your Location</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </p>
        </div>

        <CurrentWeather data={data} />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Weekly Forecast</h2>
          <WeeklyForecast data={data} />
        </div>

        <HourlyForecast data={data} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Weather Details</h2>
          <WeatherDetails data={data} />
        </div>
      </div>
    </div>
  );
};

export default Index;
