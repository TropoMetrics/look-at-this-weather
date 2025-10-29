import { Cloud, Wind, Droplets, Eye, Gauge, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";

const CurrentWeather = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current weather</p>
              <p className="text-xs text-muted-foreground mb-4">10:10 PM</p>
              <div className="flex items-center gap-4 mb-4">
                <Cloud className="w-16 h-16 text-primary" />
                <div className="text-6xl font-light">12°C</div>
              </div>
              <p className="text-xl font-medium mb-2">Partly cloudy</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Feels like <span className="text-foreground">3°</span>
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                The skies will be mostly cloudy. A breeze will accompany a low of 12°.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Gauge className="w-4 h-4" />
              Air quality
            </div>
            <div className="text-3xl font-semibold">29</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Wind className="w-4 h-4" />
              Wind
            </div>
            <div className="text-3xl font-semibold">26 km/h</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Droplets className="w-4 h-4" />
              Humidity
            </div>
            <div className="text-3xl font-semibold">71%</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Eye className="w-4 h-4" />
              Visibility
            </div>
            <div className="text-3xl font-semibold">44.2 km</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Gauge className="w-4 h-4" />
              Pressure
            </div>
            <div className="text-3xl font-semibold">1006 mb</div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Thermometer className="w-4 h-4" />
              Dew point
            </div>
            <div className="text-3xl font-semibold">7°</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
