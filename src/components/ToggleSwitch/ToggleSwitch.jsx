import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        className="toggle-switch__checkbox"
        type="checkbox"
      ></input>
      <span
        className={`toggle-switch__span ${
          currentTemperatureUnit === "F"
            ? "toggle-switch__span_active"
            : "toggle-switch__span_inactive"
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__span ${
          currentTemperatureUnit === "C"
            ? "toggle-switch__span_active"
            : "toggle-switch__span_inactive"
        }`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
