import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Warnings() {
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
        <h1 className="text-3xl font-bold">Active Weather Warnings</h1>
        <p className="text-muted-foreground">{location.name}</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No Active Warnings</AlertTitle>
        <AlertDescription>
          There are currently no active weather warnings for your location.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Weather Alert System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will display active weather warnings, advisories, and alerts for {location.name}.
            Weather warnings are issued when severe weather conditions are expected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
