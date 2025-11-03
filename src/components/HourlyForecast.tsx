import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Sun, Wind as WindIcon, Moon } from "lucide-react";
import { WeatherData, getWeatherIcon } from "@/lib/weatherApi";
import { useTemperatureUnit } from "@/contexts/TemperatureUnitContext";
import { CloudRainLight, CloudRainMedium, CloudRainHeavy, CloudSunColored, CloudMoonColored } from "@/components/RainIcons";
import { useState } from "react";

interface HourlyForecastProps {
  data: WeatherData;
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  const { unit, convertTemp } = useTemperatureUnit();
  const [hoveredTemp, setHoveredTemp] = useState<{ index: number; value: number } | null>(null);
  const [hoveredWind, setHoveredWind] = useState<{ index: number; speed: number; gust: number } | null>(null);
  const [hoveredHumidity, setHoveredHumidity] = useState<{ index: number; value: number } | null>(null);
  
  const iconMap = {
    sun: Sun,
    moon: Moon,
    cloudRainLight: CloudRainLight,
    cloudRain: CloudRainMedium,
    cloudRainHeavy: CloudRainHeavy,
    cloudSun: CloudSunColored,
    cloudMoon: CloudMoonColored,
    cloud: Cloud
  };
  
  const colorMap = {
    sun: 'text-warning',
    moon: 'text-blue-300',
    cloudRainLight: 'text-primary',
    cloudRain: 'text-primary',
    cloudRainHeavy: 'text-primary',
    cloudSun: '',
    cloudMoon: '',
    cloud: 'text-foreground'
  };
  
  const hours = data.hourly.map((hour) => {
    const iconType = getWeatherIcon(hour.weatherCode, hour.timeISO, data.daily[0].sunrise, data.daily[0].sunset);
    return {
      time: hour.time,
      temperature: hour.temperature,
      icon: iconMap[iconType],
      iconColor: colorMap[iconType],
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
                    <span className="text-sm font-medium">{convertTemp(hour.temperature)}°{unit}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 relative h-40">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1200 160" 
              preserveAspectRatio="none"
              onMouseMove={(e) => {
                const svg = e.currentTarget;
                const rect = svg.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 1200;
                const index = Math.round((x / 1200) * (hours.length - 1));
                if (index >= 0 && index < hours.length) {
                  setHoveredTemp({ index, value: hours[index].temperature });
                }
              }}
              onMouseLeave={() => setHoveredTemp(null)}
            >
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
              
              {/* Hover indicator */}
              {hoveredTemp && (
                <>
                  <line
                    x1={(hoveredTemp.index / (hours.length - 1)) * 1200}
                    y1="0"
                    x2={(hoveredTemp.index / (hours.length - 1)) * 1200}
                    y2="160"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />
                  <circle
                    cx={(hoveredTemp.index / (hours.length - 1)) * 1200}
                    cy={160 - ((hoveredTemp.value - minTemp) / tempRange) * 120 - 20}
                    r="6"
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--background))"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>
            
            {/* Hover tooltip */}
            {hoveredTemp && (
              <div 
                className="absolute bg-popover border border-border rounded-md px-3 py-2 text-sm shadow-lg pointer-events-none z-10"
                style={{
                  left: `${(hoveredTemp.index / (hours.length - 1)) * 100}%`,
                  top: `${((1 - ((hoveredTemp.value - minTemp) / tempRange)) * 100) - 20}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="font-medium">{hours[hoveredTemp.index].time}</div>
                <div className="text-muted-foreground">{convertTemp(hoveredTemp.value)}°{unit}</div>
              </div>
            )}
            
            {/* Temperature labels */}
            <div className="absolute inset-0 flex justify-between items-end pointer-events-none px-2">
              {hours.filter((_, i) => i % 2 === 0).map((hour, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  {convertTemp(hour.temperature)}°{unit}
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
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 200" 
                preserveAspectRatio="none"
                onMouseMove={(e) => {
                  const svg = e.currentTarget;
                  const rect = svg.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 1200;
                  const index = Math.round((x / 1200) * (hours.length - 1));
                  if (index >= 0 && index < hours.length) {
                    setHoveredWind({ 
                      index, 
                      speed: hours[index].windSpeed, 
                      gust: hours[index].windGusts 
                    });
                  }
                }}
                onMouseLeave={() => setHoveredWind(null)}
              >
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
                
                {/* Hover indicator */}
                {hoveredWind && (
                  <>
                    <line
                      x1={(hoveredWind.index / (hours.length - 1)) * 1200}
                      y1="0"
                      x2={(hoveredWind.index / (hours.length - 1)) * 1200}
                      y2="200"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <circle
                      cx={(hoveredWind.index / (hours.length - 1)) * 1200}
                      cy={200 - ((hoveredWind.speed - minWind) / windRange) * 180}
                      r="6"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
              
              {/* Hover tooltip */}
              {hoveredWind && (
                <div 
                  className="absolute bg-popover border border-border rounded-md px-3 py-2 text-sm shadow-lg pointer-events-none z-10"
                  style={{
                    left: `${(hoveredWind.index / (hours.length - 1)) * 100}%`,
                    top: `${((1 - ((hoveredWind.speed - minWind) / windRange)) * 100) - 10}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <div className="font-medium">{hours[hoveredWind.index].time}</div>
                  <div className="text-muted-foreground">Speed: {Math.round(hoveredWind.speed)} km/h</div>
                  <div className="text-muted-foreground">Gust: {Math.round(hoveredWind.gust)} km/h</div>
                </div>
              )}
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
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 200" 
                preserveAspectRatio="none"
                onMouseMove={(e) => {
                  const svg = e.currentTarget;
                  const rect = svg.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 1200;
                  const index = Math.round((x / 1200) * (hours.length - 1));
                  if (index >= 0 && index < hours.length) {
                    setHoveredHumidity({ index, value: hours[index].humidity });
                  }
                }}
                onMouseLeave={() => setHoveredHumidity(null)}
              >
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
                
                {/* Hover indicator */}
                {hoveredHumidity && (
                  <>
                    <line
                      x1={(hoveredHumidity.index / (hours.length - 1)) * 1200}
                      y1="0"
                      x2={(hoveredHumidity.index / (hours.length - 1)) * 1200}
                      y2="200"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <circle
                      cx={(hoveredHumidity.index / (hours.length - 1)) * 1200}
                      cy={200 - (hoveredHumidity.value / 100) * 180}
                      r="6"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
              
              {/* Hover tooltip */}
              {hoveredHumidity && (
                <div 
                  className="absolute bg-popover border border-border rounded-md px-3 py-2 text-sm shadow-lg pointer-events-none z-10"
                  style={{
                    left: `${(hoveredHumidity.index / (hours.length - 1)) * 100}%`,
                    top: `${((1 - (hoveredHumidity.value / 100)) * 100) - 10}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <div className="font-medium">{hours[hoveredHumidity.index].time}</div>
                  <div className="text-muted-foreground">{hoveredHumidity.value}%</div>
                </div>
              )}
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
