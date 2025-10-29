import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";

const WeeklyForecast = () => {
  const days = [
    { date: "28", day: "Today", icon: CloudRain, high: "13°", low: "10°" },
    { date: "29", day: "Wed", icon: CloudRain, high: "13°", low: "10°" },
    { date: "30", day: "Thu", icon: CloudSun, high: "13°", low: "8°" },
    { date: "31", day: "Fri", icon: Cloud, high: "14°", low: "13°" },
    { date: "1", day: "Sat", icon: CloudRain, high: "15°", low: "10°" },
    { date: "2", day: "Sun", icon: Sun, high: "11°", low: "10°" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {days.map((day, index) => {
        const IconComponent = day.icon;
        return (
          <Card
            key={index}
            className="min-w-[120px] p-4 bg-card border-border hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <div className="text-2xl font-semibold">{day.date}</div>
                <div className="text-xs text-muted-foreground">{day.day}</div>
              </div>
              <IconComponent className="w-12 h-12 text-primary" />
              <div className="flex gap-2 text-sm">
                <span className="font-medium">{day.high}</span>
                <span className="text-muted-foreground">{day.low}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
