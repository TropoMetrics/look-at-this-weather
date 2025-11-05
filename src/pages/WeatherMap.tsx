import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Map } from "lucide-react";

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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Current Weather Map</h1>
        <p className="text-muted-foreground">{location.name}</p>
      </div>

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
    </div>
  );
}
