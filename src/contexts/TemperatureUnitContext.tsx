import { createContext, useContext, useState, ReactNode } from "react";

type TemperatureUnit = "C" | "F";

interface TemperatureUnitContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  convertTemp: (celsius: number) => number;
}

const TemperatureUnitContext = createContext<TemperatureUnitContextType | undefined>(undefined);

export function TemperatureUnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  const convertTemp = (celsius: number) => {
    return unit === "F" ? Math.round((celsius * 9) / 5 + 32) : celsius;
  };

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit, convertTemp }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);
  if (context === undefined) {
    throw new Error("useTemperatureUnit must be used within a TemperatureUnitProvider");
  }
  return context;
}
