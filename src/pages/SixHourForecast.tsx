import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wind, Waves } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function SixHourForecast() {
  const { location, data, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Find the current hour index and get next 6 hours from there
  const currentTime = new Date();
  const currentHourIndex = data?.hourly.findIndex(hour => {
    const hourTime = new Date(hour.timeISO);
    return hourTime >= currentTime;
  }) || 0;
  
  const next6Hours = data?.hourly.slice(currentHourIndex, currentHourIndex + 6) || [];

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-4 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">6-Hour Forecast</h1>
            <p className="text-muted-foreground ml-auto">{location.name}</p>
          </header>

          <main className="flex-1 overflow-auto p-6">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
