import classes from "./form.module.css";

export default function DRloadForm({
  selectedValue,
  device,
  onSelected,
  onEnteredValues,
  onSubmitted,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSelected(null);
    onSubmitted(device, false);
  }

  function handleRemove() {
    onSelected(null);
    onSubmitted(device, false);
  }
  return (
    <>
      <form className={classes.simple} onSubmit={handleSubmit}>
        <h2 className={classes["header"]}>{selectedValue}</h2>

        <div className={classes["control"]}>
          <label className={classes.label} htmlFor="text">
            Bus
          </label>
          <input
            className={classes.input}
            id="bus"
            type="text"
            name="bus_uid"
            value={device.bus}
            readOnly={true}
          />
        </div>

        <div className={classes["control-row"]}>
          <div className={classes["control"]}>
            <label className={classes.label} htmlFor="text">
              Response Percent [0 - 1]
            </label>
            <input
              className={classes.input}
              id="response_percent"
              type="number"
              name="response_percent"
              value={device.response_percent}
              onChange={(event) =>
                onEnteredValues("response_percent", event.target.value)
              }
            />
          </div>

          <div className={classes["control"]}>
            <label className={classes.label} htmlFor="text">
              Cost [$/kWh]
            </label>
            <input
              className={classes.input}
              id="cost"
              type="number"
              name="cost"
              value={device.cost}
              onChange={(event) => onEnteredValues("cost", event.target.value)}
            />
          </div>
        </div>

        <fieldset>
          <legend className={classes.label}>Terminals</legend>
          {device.terminals.map((terminal) => (
            <div key={terminal} className={classes.control}>
              <input
                type="checkbox"
                id={`terminal_${terminal}`}
                name="terminals"
                checked={device.phases.includes(terminal)}
                onChange={(event) => {
                  if (device.phases.includes(terminal)) {
                    onEnteredValues(
                      "phases",
                      device.phases.includes(terminal)
                        ? device.phases.filter((f) => f !== terminal)
                        : [...device.phases, terminal]
                    );
                    onEnteredValues(
                      "p",
                      Object.fromEntries(
                        Object.entries(device.p).filter(
                          ([key, value]) => key !== terminal.toString()
                        )
                      )
                    );
                  } else {
                    onEnteredValues("phases", [...device.phases, terminal]);
                    onEnteredValues("p", {
                      ...device.p,
                      [terminal.toString()]: Array(24).fill(0),
                    });
                  }
                }}
              />
              <label className={classes.label} htmlFor={terminal}>
                {terminal}
              </label>
            </div>
          ))}
        </fieldset>

        <p className="actions">
          <button type="button" className="button-flat" onClick={handleRemove}>
            Remove
          </button>
          <button className="submit-button">Submit</button>
        </p>
      </form>
    </>
  );
}
