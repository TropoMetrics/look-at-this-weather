import CurrentWeather from "@/components/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast";
import WeeklyForecast from "@/components/WeeklyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import { LocationSearch } from "@/components/LocationSearch";
import { useWeather } from "@/hooks/useWeather";
import { useTemperatureUnit } from "@/contexts/TemperatureUnitContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MapPin, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data, isLoading, error, location, setLocation, getUserLocation, refetch } = useWeather();
  const { unit, toggleUnit } = useTemperatureUnit();

  if (isLoading && !data) {
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
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={async () => {
                    await getUserLocation();
                  }}
                  title="Use my location"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                </Button>
                <h1 className="text-xl font-semibold">{location.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="temp-unit" className="text-sm">°C</Label>
                <Switch 
                  id="temp-unit" 
                  checked={unit === "F"} 
                  onCheckedChange={toggleUnit}
                />
                <Label htmlFor="temp-unit" className="text-sm">°F</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
              <LocationSearch 
                onLocationSelect={(lat, lon, name) => {
                  setLocation({ latitude: lat, longitude: lon, name });
                }}
              />

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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
