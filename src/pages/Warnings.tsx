import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

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
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-4 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Active Weather Warnings</h1>
            <p className="text-muted-foreground ml-auto">{location.name}</p>
          </header>

          <main className="flex-1 overflow-auto p-6 space-y-6">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
