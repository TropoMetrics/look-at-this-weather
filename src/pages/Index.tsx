import CurrentWeather from "@/components/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast";
import WeeklyForecast from "@/components/WeeklyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import { MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-semibold">Norwich</h1>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: 10:10 PM</p>
        </div>

        <CurrentWeather />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Weekly Forecast</h2>
          <WeeklyForecast />
        </div>

        <HourlyForecast />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Weather Details</h2>
          <WeatherDetails />
        </div>
      </div>
    </div>
  );
};

export default Index;
