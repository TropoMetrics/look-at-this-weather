import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wind, Waves, AlertTriangle, Map } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function MaritimeWeather() {
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
            <h1 className="text-2xl font-bold">Maritime Weather Service</h1>
            <p className="text-muted-foreground ml-auto">{location.name}</p>
          </header>

          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* Active Weather Warnings Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Active Weather Warnings</h2>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>No Active Warnings</AlertTitle>
                <AlertDescription>
                  There are currently no active weather warnings for your location.
                </AlertDescription>
              </Alert>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Weather Alert System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This section displays active weather warnings, advisories, and alerts for {location.name}.
                    Weather warnings are issued when severe weather conditions are expected.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Current Weather Map Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Current Weather Map</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Weather Radar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Map className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Weather map placeholder</p>
                      <p className="text-sm text-muted-foreground">Location: {location.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 6-Hour Forecast Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">6-Hour Forecast (Wind & Waves)</h2>
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
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
