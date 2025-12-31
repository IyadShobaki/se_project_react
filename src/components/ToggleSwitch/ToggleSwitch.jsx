import "./ToggleSwitch.css";

function ToggleSwitch() {
  return (
    <label className="toggle-switch">
      <input className="toggle-switch__checkbox" type="checkbox"></input>
      <span className="toggle-switch__span toggle-switch__span_active">F</span>
      <span className="toggle-switch__span toggle-switch__span_inactive">
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
