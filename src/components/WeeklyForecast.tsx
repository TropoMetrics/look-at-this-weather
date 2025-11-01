import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSun, Sun, Moon, CloudMoon } from "lucide-react";
import { WeatherData, getWeatherIcon } from "@/lib/weatherApi";
import { useTemperatureUnit } from "@/contexts/TemperatureUnitContext";

interface WeeklyForecastProps {
  data: WeatherData;
}

const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  const { unit, convertTemp } = useTemperatureUnit();
  
  const iconMap = {
    sun: Sun,
    moon: Moon,
    cloudRain: CloudRain,
    cloudSun: CloudSun,
    cloudMoon: CloudMoon,
    cloud: Cloud
  };
  
  const colorMap = {
    sun: 'text-warning',
    moon: 'text-blue-300',
    cloudRain: 'text-primary',
    cloudSun: 'text-warning',
    cloudMoon: 'text-blue-300',
    cloud: 'text-foreground'
  };
  
  const days = data.daily.map((day, index) => {
    const date = new Date(day.date);
    // For daily forecast, use noon as the reference time
    const noonTime = `${day.date}T12:00:00`;
    const iconType = getWeatherIcon(day.weatherCode, noonTime, day.sunrise, day.sunset);
    return {
      date: date.getDate().toString(),
      day: index === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'short' }),
      icon: iconMap[iconType],
      iconColor: colorMap[iconType],
      high: day.temperatureMax,
      low: day.temperatureMin,
    };
  });

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
              <IconComponent className={`w-12 h-12 ${day.iconColor}`} />
              <div className="flex gap-2 text-sm">
                <span className="font-medium">{convertTemp(day.high)}°{unit}</span>
                <span className="text-muted-foreground">{convertTemp(day.low)}°{unit}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
