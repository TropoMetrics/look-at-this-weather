import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, CloudRain } from "lucide-react";

const HourlyForecast = () => {
  const hours = [
    { time: "2 AM", temp: "12°", icon: CloudRain },
    { time: "4 AM", temp: "12°", icon: CloudRain },
    { time: "6 AM", temp: "12°", icon: CloudRain },
    { time: "8 AM", temp: "12°", icon: Cloud },
    { time: "10 AM", temp: "12°", icon: Cloud },
    { time: "12 PM", temp: "13°", icon: Cloud },
    { time: "2 PM", temp: "13°", icon: Cloud },
    { time: "4 PM", temp: "13°", icon: Cloud },
    { time: "6 PM", temp: "12°", icon: CloudRain },
    { time: "8 PM", temp: "12°", icon: CloudRain },
    { time: "10 PM", temp: "11°", icon: CloudRain },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hourly</h2>
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
            <TabsTrigger value="wind">Wind</TabsTrigger>
            <TabsTrigger value="air-quality">Air Quality</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0">
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {hours.map((hour, index) => {
                const IconComponent = hour.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground">{hour.time}</span>
                    <IconComponent className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium">{hour.temp}</span>
                    <div className="w-full bg-primary/20 rounded-full h-1 mt-2">
                      <div
                        className="bg-primary rounded-full h-1"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 h-32 bg-gradient-to-b from-success/20 via-success/10 to-primary/20 rounded-lg relative">
            <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
        </TabsContent>

        <TabsContent value="precipitation">
          <div className="py-8 text-center text-muted-foreground">
            Precipitation data
          </div>
        </TabsContent>

        <TabsContent value="wind">
          <div className="py-8 text-center text-muted-foreground">
            Wind data
          </div>
        </TabsContent>

        <TabsContent value="air-quality">
          <div className="py-8 text-center text-muted-foreground">
            Air quality data
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default HourlyForecast;
