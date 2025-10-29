import { Cloud, Sun, CloudRain, CloudSun, Wind, Droplets, Eye, Gauge, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WeatherData, getWeatherDescription, getWeatherIcon } from "@/lib/weatherApi";

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const iconType = getWeatherIcon(data.current.weatherCode);
  const WeatherIcon = iconType === 'sun' ? Sun : iconType === 'cloudRain' ? CloudRain : iconType === 'cloudSun' ? CloudSun : Cloud;
  const iconColor = iconType === 'sun' ? 'text-warning' : iconType === 'cloudRain' ? 'text-primary' : 'text-foreground';
  const description = getWeatherDescription(data.current.weatherCode);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current weather</p>
              <p className="text-xs text-muted-foreground mb-4">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
              <div className="flex items-center gap-4 mb-4">
                <WeatherIcon className={`w-16 h-16 ${iconColor}`} />
                <div className="text-6xl font-light">{data.current.temperature}°C</div>
              </div>
              <p className="text-xl font-medium mb-2">{description}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Feels like <span className="text-foreground">{data.current.feelsLike}°</span>
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Cloud cover at {data.current.cloudCover}%. Wind speed {data.current.windSpeed} km/h.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Gauge className="w-4 h-4" />
              UV Index
            </div>
            <div className="text-3xl font-semibold">{data.current.uvIndex.toFixed(1)}</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Wind className="w-4 h-4" />
              Wind
            </div>
            <div className="text-3xl font-semibold">{data.current.windSpeed} km/h</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Droplets className="w-4 h-4" />
              Humidity
            </div>
            <div className="text-3xl font-semibold">{data.current.humidity}%</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Eye className="w-4 h-4" />
              Visibility
            </div>
            <div className="text-3xl font-semibold">{data.current.visibility} km</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Gauge className="w-4 h-4" />
              Pressure
            </div>
            <div className="text-3xl font-semibold">{data.current.pressure} mb</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Thermometer className="w-4 h-4" />
              Dew point
            </div>
            <div className="text-3xl font-semibold">{data.current.dewPoint}°</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
