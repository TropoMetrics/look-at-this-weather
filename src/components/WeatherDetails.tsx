import { Card } from "@/components/ui/card";
import { Wind, Droplets, Eye, Gauge, Moon, Sun } from "lucide-react";

const WeatherDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Temperature</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gradient-to-r from-primary to-accent rounded-full relative">
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
          </div>
          <div className="text-4xl font-light">12°</div>
          <p className="text-xs text-muted-foreground">Steady ☀️</p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Feels like</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gradient-to-r from-accent to-primary rounded-full relative">
            <div className="absolute left-1/4 -top-1 w-4 h-4 bg-accent rounded-full border-2 border-background" />
          </div>
          <div className="text-4xl font-light">3°</div>
          <p className="text-xs text-muted-foreground">Chilly ❄️</p>
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
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center rotate-45">
                <div className="w-1 h-6 bg-success rounded-full" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light">26</div>
            <div className="text-xs text-muted-foreground">km/h</div>
            <div className="text-2xl font-light mt-2">45</div>
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
          <div className="text-4xl font-light">71%</div>
          <div className="text-sm">
            <span className="text-muted-foreground">Dew point: </span>
            <span className="text-foreground">7°</span>
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
                strokeDasharray={`${(1 / 11) * 339} 339`}
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
              <div className="text-4xl font-light">1</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-success mt-2">Low ✓</p>
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
                strokeDasharray={`${(29 / 100) * 339} 339`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-light">29</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-success mt-2">Good ✓</p>
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
          <div className="text-4xl font-light">44.2 <span className="text-xl text-muted-foreground">km</span></div>
          <p className="text-xs text-success">Excellent ✓</p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Gauge className="w-4 h-4" />
          <span>Pressure</span>
        </div>
        <div className="space-y-3">
          <div className="relative h-2 bg-secondary rounded-full">
            <div className="absolute left-3/4 -top-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
          </div>
          <div className="text-4xl font-light">1006 <span className="text-xl text-muted-foreground">mb</span></div>
          <p className="text-xs text-muted-foreground">Rising slowly 🔼</p>
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
