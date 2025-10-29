import { Card } from "@/components/ui/card";
import { Wind, Droplets, Eye, Gauge, Moon, Sun } from "lucide-react";
import { WeatherData } from "@/lib/weatherApi";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const getUVLevel = (uv: number) => {
    if (uv < 3) return { level: "Low", color: "text-success" };
    if (uv < 6) return { level: "Moderate", color: "text-warning" };
    if (uv < 8) return { level: "High", color: "text-accent" };
    return { level: "Very High", color: "text-destructive" };
  };

  const uvInfo = getUVLevel(data.current.uvIndex);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Temperature</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gradient-to-r from-primary to-accent rounded-full relative">
            <div 
              className="absolute -top-1 w-4 h-4 bg-primary rounded-full border-2 border-background transition-all"
              style={{ left: `${(data.current.temperature + 10) * 2}%` }}
            />
          </div>
          <div className="text-4xl font-light">{data.current.temperature}°</div>
          <p className="text-xs text-muted-foreground">Current temperature</p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Feels like</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gradient-to-r from-accent to-primary rounded-full relative">
            <div 
              className="absolute -top-1 w-4 h-4 bg-accent rounded-full border-2 border-background transition-all"
              style={{ left: `${(data.current.feelsLike + 10) * 2}%` }}
            />
          </div>
          <div className="text-4xl font-light">{data.current.feelsLike}°</div>
          <p className="text-xs text-muted-foreground">Apparent temperature</p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Wind className="w-4 h-4" />
          <span>Wind</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center transition-transform"
                style={{ transform: `rotate(${data.current.windDirection}deg)` }}
              >
                <div className="relative w-1 h-8 bg-success rounded-full">
                  <div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-success"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-medium">N</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">S</div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-xs text-muted-foreground">W</div>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-xs text-muted-foreground">E</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light">{data.current.windSpeed}</div>
            <div className="text-xs text-muted-foreground">km/h</div>
            <div className="text-2xl font-light mt-2">{data.current.windGusts}</div>
            <div className="text-xs text-muted-foreground">Wind Gust</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Droplets className="w-4 h-4" />
          <span>Humidity</span>
        </div>
        <div className="space-y-3">
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-full"
                style={{ height: `${(i + 1) * 8}px` }}
              />
            ))}
          </div>
          <div className="text-4xl font-light">{data.current.humidity}%</div>
          <div className="text-sm">
            <span className="text-muted-foreground">Dew point: </span>
            <span className="text-foreground">{data.current.dewPoint}°</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Sun className="w-4 h-4" />
          <span>UV Index</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(data.current.uvIndex / 11) * 339} 339`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--success))" />
                  <stop offset="50%" stopColor="hsl(var(--warning))" />
                  <stop offset="100%" stopColor="hsl(var(--destructive))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-light">{data.current.uvIndex.toFixed(1)}</div>
            </div>
          </div>
        </div>
        <p className={`text-xs text-center ${uvInfo.color} mt-2`}>{uvInfo.level} ✓</p>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Gauge className="w-4 h-4" />
          <span>AQI</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="hsl(var(--success))"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(Math.min(data.current.humidity, 100) / 100) * 339} 339`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-light">{data.current.humidity}</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-success mt-2">
          {data.current.humidity < 50 ? "Good" : data.current.humidity < 70 ? "Moderate" : "High"} ✓
        </p>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Eye className="w-4 h-4" />
          <span>Visibility</span>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-2 bg-success rounded-full"
              style={{ width: `${100 - i * 10}%` }}
            />
          ))}
          <div className="text-4xl font-light">{data.current.visibility} <span className="text-xl text-muted-foreground">km</span></div>
          <p className="text-xs text-success">
            {data.current.visibility > 40 ? "Excellent" : data.current.visibility > 20 ? "Good" : "Poor"} ✓
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Gauge className="w-4 h-4" />
          <span>Pressure</span>
        </div>
        <div className="space-y-3">
          <div className="relative h-2 bg-secondary rounded-full">
            <div 
              className="absolute -top-1 w-4 h-4 bg-primary rounded-full border-2 border-background transition-all"
              style={{ left: `${((data.current.pressure - 950) / 100) * 100}%` }}
            />
          </div>
          <div className="text-4xl font-light">{data.current.pressure} <span className="text-xl text-muted-foreground">mb</span></div>
          <p className="text-xs text-muted-foreground">
            {data.current.pressure > 1013 ? "High pressure" : "Low pressure"}
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Moon className="w-4 h-4" />
          <span>Moon phase</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-warning overflow-hidden">
              <div className="absolute inset-0 bg-background" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }} />
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light">37%</div>
            <div className="text-xs text-muted-foreground mb-2">Phase of moon</div>
            <div className="text-sm">
              <div className="flex items-center gap-1">
                <Sun className="w-3 h-3 text-warning" />
                <span className="text-xs">2:52 PM</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Moon className="w-3 h-3" />
                <span className="text-xs">11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeatherDetails;
