import React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type FxControlProps = {
  icon: React.ReactNode; // The icon to display
  controlType: "slider" | "switch"; // The type of control
  value?: number | boolean; // Current value of the control
  min?: number; // Min value for sliders
  max?: number; // Max value for sliders
  step?: number; // Step for sliders
  onChange: (value: any) => void; // Callback when value changes
};

const FxControl = ({
  icon,
  controlType,
  value,
  min,
  max,
  step,
  onChange,
}: FxControlProps) => {
  return (
    <div className="flex gap-4">
      {icon}
      {controlType === "slider" && (
        <Slider
          value={[value as number]}
          min={min}
          max={max}
          step={step}
          onValueChange={(newValue) => onChange(newValue[0])}
        />
      )}
      {controlType === "switch" && (
        <Switch
          checked={value as boolean}
          onCheckedChange={(newValue) => onChange(newValue)}
        />
      )}
    </div>
  );
};

export default FxControl;
