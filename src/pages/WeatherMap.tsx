import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Map } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function WeatherMap() {
  const { location, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-4 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Current Weather Map</h1>
            <p className="text-muted-foreground ml-auto">{location.name}</p>
          </header>

          <main className="flex-1 overflow-auto p-6">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
