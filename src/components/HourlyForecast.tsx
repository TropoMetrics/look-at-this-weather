import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, CloudRain, CloudSun, Sun, Wind as WindIcon } from "lucide-react";
import { WeatherData, getWeatherIcon } from "@/lib/weatherApi";

interface HourlyForecastProps {
  data: WeatherData;
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  const hours = data.hourly.map((hour) => {
    const iconType = getWeatherIcon(hour.weatherCode);
    return {
      time: hour.time,
      temp: `${hour.temperature}°`,
      temperature: hour.temperature,
      icon: iconType === 'sun' ? Sun : iconType === 'cloudRain' ? CloudRain : iconType === 'cloudSun' ? CloudSun : Cloud,
      iconColor: iconType === 'sun' ? 'text-warning' : iconType === 'cloudRain' ? 'text-primary' : 'text-foreground',
      precipitation: hour.precipitation,
      windSpeed: hour.windSpeed,
      windDirection: hour.windDirection,
      windGusts: hour.windGusts,
      humidity: hour.humidity,
    };
  });

  // Calculate temperature range for graph scaling
  const temperatures = hours.map(h => h.temperature);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  const tempRange = maxTemp - minTemp || 1;

  // Calculate wind range for graph scaling
  const windSpeeds = hours.map(h => h.windSpeed);
  const windGusts = hours.map(h => h.windGusts);
  const minWind = 0;
  const maxWind = Math.max(...windGusts);
  const windRange = maxWind - minWind || 1;

  return (
    <Card className="p-6 bg-card border-border">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hourly</h2>
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wind">Wind</TabsTrigger>
            <TabsTrigger value="humidity">Humidity</TabsTrigger>
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
                    <IconComponent className={`w-8 h-8 ${hour.iconColor}`} />
                    <span className="text-sm font-medium">{hour.temp}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 relative h-40">
            <svg className="w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="1200"
                  y2={i * 40}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
              
              {/* Temperature gradient area */}
              <defs>
                <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Temperature area fill */}
              <path
                d={`M 0 160 ${hours.map((hour, i) => {
                  const x = (i / (hours.length - 1)) * 1200;
                  const y = 160 - ((hour.temperature - minTemp) / tempRange) * 120 - 20;
                  return `L ${x} ${y}`;
                }).join(' ')} L 1200 160 Z`}
                fill="url(#tempGradient)"
              />
              
              {/* Temperature line */}
              <path
                d={hours.map((hour, i) => {
                  const x = (i / (hours.length - 1)) * 1200;
                  const y = 160 - ((hour.temperature - minTemp) / tempRange) * 120 - 20;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Temperature points */}
              {hours.map((hour, i) => {
                const x = (i / (hours.length - 1)) * 1200;
                const y = 160 - ((hour.temperature - minTemp) / tempRange) * 120 - 20;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="hsl(var(--primary))"
                  />
                );
              })}
            </svg>
            
            {/* Temperature labels */}
            <div className="absolute inset-0 flex justify-between items-end pointer-events-none px-2">
              {hours.filter((_, i) => i % 2 === 0).map((hour, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  {hour.temp}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wind" className="mt-0">
          {/* Wind direction arrows */}
          <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 min-w-[80px] p-3"
              >
                <span className="text-xs text-muted-foreground">{hour.time}</span>
                <div 
                  className="transition-transform"
                  style={{ transform: `rotate(${hour.windDirection}deg)` }}
                >
                  <WindIcon className="w-6 h-6 text-foreground" />
                </div>
              </div>
            ))}
          </div>

          {/* Wind speed and gust graph */}
          <div className="relative h-56 bg-card rounded-lg p-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
              <span>{Math.round(maxWind)}</span>
              <span>{Math.round(maxWind * 0.75)}</span>
              <span>{Math.round(maxWind * 0.5)}</span>
              <span>{Math.round(maxWind * 0.25)}</span>
              <span>0 km/h</span>
            </div>

            <div className="ml-12 h-full">
              <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="1200"
                    y2={i * 50}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
                
                {/* Wind gust gradient area */}
                <defs>
                  <linearGradient id="windGustGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Wind gust area fill */}
                <path
                  d={`M 0 200 ${hours.map((hour, i) => {
                    const x = (i / (hours.length - 1)) * 1200;
                    const y = 200 - ((hour.windGusts - minWind) / windRange) * 180;
                    return `L ${x} ${y}`;
                  }).join(' ')} L 1200 200 Z`}
                  fill="url(#windGustGradient)"
                />
                
                {/* Wind gust line */}
                <path
                  d={hours.map((hour, i) => {
                    const x = (i / (hours.length - 1)) * 1200;
                    const y = 200 - ((hour.windGusts - minWind) / windRange) * 180;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                />
                
                {/* Wind speed area fill */}
                <path
                  d={`M 0 200 ${hours.map((hour, i) => {
                    const x = (i / (hours.length - 1)) * 1200;
                    const y = 200 - ((hour.windSpeed - minWind) / windRange) * 180;
                    return `L ${x} ${y}`;
                  }).join(' ')} L 1200 200 Z`}
                  fill="hsl(var(--primary) / 0.1)"
                />
                
                {/* Wind speed line */}
                <path
                  d={hours.map((hour, i) => {
                    const x = (i / (hours.length - 1)) * 1200;
                    const y = 200 - ((hour.windSpeed - minWind) / windRange) * 180;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary rounded"></div>
                <span className="text-muted-foreground">Wind speed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary rounded border-dashed border border-primary"></div>
                <span className="text-muted-foreground">Wind gust</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="humidity" className="mt-0">
          <div className="relative h-56 bg-card rounded-lg p-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="ml-12 h-full">
              <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="1200"
                    y2={i * 50}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
                
                {/* Humidity gradient area */}
                <defs>
                  <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Humidity area fill */}
                <path
                  d={`M 0 200 ${hours.map((hour, i) => {
                    const x = (i / (hours.length - 1)) * 1200;
                    const y = 200 - (hour.humidity / 100) * 180;
                    return `L ${x} ${y}`;
                  }).join(' ')} L 1200 200 Z`}
                  fill="url(#humidityGradient)"
                />
                
                {/* Humidity line */}
                <path
                  d={hours.map((hour, i) => {
                    const x = (i / (hours.length - 1)) * 1200;
                    const y = 200 - (hour.humidity / 100) * 180;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Humidity points */}
                {hours.map((hour, i) => {
                  const x = (i / (hours.length - 1)) * 1200;
                  const y = 200 - (hour.humidity / 100) * 180;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="hsl(var(--primary))"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Humidity value labels */}
            <div className="absolute bottom-4 left-12 right-4 flex justify-between pointer-events-none">
              {hours.filter((_, i) => i % 3 === 0).map((hour, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  {hour.humidity}%
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default HourlyForecast;
