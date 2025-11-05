import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wind, Waves } from "lucide-react";

export default function SixHourForecast() {
  const { location, data, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const next6Hours = data?.hourly.slice(0, 6) || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">6-Hour Forecast</h1>
        <p className="text-muted-foreground">{location.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {next6Hours.map((hourData) => {
          const hour = new Date(hourData.timeISO).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const windSpeed = hourData.windSpeed;
          const windDirection = hourData.windDirection;
          
          return (
            <Card key={hourData.timeISO}>
              <CardHeader>
                <CardTitle className="text-lg">{hour}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="text-xl font-semibold">{windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" style={{ transform: `rotate(${windDirection}deg)` }} />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Direction</p>
                    <p className="text-xl font-semibold">{windDirection}°</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wave Height</p>
                    <p className="text-xl font-semibold">N/A</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
