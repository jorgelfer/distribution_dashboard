import UnitForm from "./formUnit";
import BatteryForm from "./formBattery";
import DRloadForm from "./formDR";

export default function Form(
  selectedValue,
  device,
  handleSelectDevice,
  handleChangeDevice,
  handleSubmitDevice
) {
  switch (selectedValue) {
    case "battery":
      return (
        <BatteryForm
          selectedValue={selectedValue}
          device={device}
          onSelected={handleSelectDevice}
          onEnteredValues={handleChangeDevice}
          onSubmitted={handleSubmitDevice}
        />
      );
    case "flex_gen":
      return (
        <UnitForm
          selectedValue={selectedValue}
          device={device}
          onSelected={handleSelectDevice}
          onEnteredValues={handleChangeDevice}
          onSubmitted={handleSubmitDevice}
        />
      );
    case "flex_load":
      return (
        <UnitForm
          selectedValue={selectedValue}
          device={device}
          onSelected={handleSelectDevice}
          onEnteredValues={handleChangeDevice}
          onSubmitted={handleSubmitDevice}
        />
      );
    case "dr_load":
      return (
        <DRloadForm
          selectedValue={selectedValue}
          device={device}
          onSelected={handleSelectDevice}
          onEnteredValues={handleChangeDevice}
          onSubmitted={handleSubmitDevice}
        />
      );
    default:
      return null;
  }
}
