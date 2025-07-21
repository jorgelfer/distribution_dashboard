import * as d3 from "d3";

export function updateData(
  network,
  selectedValue,
  selectedBuses,
  selectedLine,
  dateParser,
  vm_base
) {
  // buses uid
  let buses_uid = network.bus.map((d) => d.uid);
  if (selectedBuses.buses.length > 0) {
    buses_uid = selectedBuses.buses.map((d) => d.uid);
  }

  // voltage data
  let vdata = [];
  network.bus.forEach((d, i) => {
    if (buses_uid.includes(d.uid)) {
      d["phases"].forEach((d2, i2) => {
        vdata.push(
          d.vm[d2.toString()].map((d3, i3) => ({
            time: dateParser(network["time"][i3]),
            val: +d3 / (+d.kV_base * 1000),
            phase: d2.toString(),
            bus: d.uid,
            uid: d.uid + "." + d2.toString(),
          }))
        );
      });
    }
  });

  // push lower limit
  const vm_lb = 1 - (isNaN(network["ansi"]) ? vm_base : +network["ansi"]);
  network["time"].forEach((d, i) => {
    vdata.push({
      time: dateParser(d),
      val: vm_lb,
      phase: "0",
      uid: "lb.0",
    });
  });

  // push upper limit
  const vm_ub = 1 + (isNaN(network["ansi"]) ? vm_base : +network["ansi"]);
  network["time"].forEach((d, i) => {
    vdata.push({
      time: dateParser(d),
      val: vm_ub,
      phase: "4",
      uid: "ub.0",
    });
  });

  let vextent = [vm_lb - 0.05, vm_ub + 0.05];

  // initialize data container
  let data = [];
  switch (selectedValue) {
    case "flow":
      // organize data
      let data_nm = [];
      selectedLine.forEach((d, i) => {
        d["f_connections"].forEach((d2, i2) => {
          data_nm.push(
            d.p_nm[d2.toString()].map((d3, i3) => ({
              time: dateParser(network["time"][i3]),
              p: +d3,
              q: +d.q_nm[d2.toString()][i3],
              s: Math.sqrt(
                Math.pow(+d3, 2) + Math.pow(+d.q_nm[d2.toString()][i3], 2)
              ),
              phase: d2.toString(),
              branch: d.uid,
              uid: d.uid + "." + d2.toString(),
            }))
          );
        });
        // append limit
        network["time"].forEach((d2, i2) => {
          data_nm.push({
            time: dateParser(d2),
            p: +d["normal_flow_limit"],
            q: +d["normal_flow_limit"],
            s: +d["normal_flow_limit"],
            phase: "4",
            branch: d.uid,
            uid: d.uid + ".4",
          });
        });
      });

      let data_mn = [];
      selectedLine.forEach((d, i) => {
        d["t_connections"].forEach((d2, i2) => {
          data_mn.push(
            d.p_mn[d2.toString()].map((d3, i3) => ({
              time: dateParser(network["time"][i3]),
              p: -d3,
              q: -d.q_mn[d2.toString()][i3],
              s: Math.sqrt(
                Math.pow(+d3, 2) + Math.pow(+d.q_mn[d2.toString()][i3], 2)
              ),
              phase: d2.toString(),
              branch: d.uid,
              uid: d.uid + "." + d2.toString(),
            }))
          );
        });
        // append limit
        network["time"].forEach((d2, i2) => {
          data_mn.push({
            time: dateParser(d2),
            p: +d["normal_flow_limit"],
            q: +d["normal_flow_limit"],
            s: +d["normal_flow_limit"],
            phase: "4",
            branch: d.uid,
            uid: d.uid + ".4",
          });
        });
      });

      // console.log("data", data);
      return [
        vdata,
        vextent,
        [data_nm, data_mn],
        [
          [0, d3.max(data_nm.flat().map((d) => d.s))],
          [0, d3.max(data_mn.flat().map((d) => d.s))],
        ],
      ];

    case "vsource":
      // organize data
      network["vsource"].forEach((d, i) => {
        if (buses_uid.includes(d.bus)) {
          d["phases"].forEach((d2, i2) => {
            data.push(
              d.p[d2.toString()].map((d3, i3) => ({
                time: dateParser(network["time"][i3]),
                p: +d3,
                q: +d.q[d2.toString()][i3],
                s: Math.sqrt(
                  Math.pow(+d3, 2) + Math.pow(+d.q[d2.toString()][i3], 2)
                ),
                phase: d2.toString(),
                bus: d.bus,
                uid: d.uid + "." + d2.toString(),
              }))
            );
          });
        }
      });
      return [vdata, vextent, data, [0, d3.max(data.flat().map((d) => d.s))]];

    case "load":
      // organize data
      network["load"].forEach((d, i) => {
        if (buses_uid.includes(d.bus)) {
          d["phases"].forEach((d2, i2) => {
            data.push(
              d.p[d2.toString()].map((d3, i3) => ({
                time: dateParser(network["time"][i3]),
                p: +d3,
                q: d.q[d2.toString()][i3],
                s: Math.sqrt(
                  Math.pow(+d3, 2) + Math.pow(+d.q[d2.toString()][i3], 2)
                ),
                phase: d2.toString(),
                bus: d.bus,
                uid: d.uid + "." + d2.toString(),
              }))
            );
          });
        }
      });
      return [vdata, vextent, data, [0, d3.max(data.flat().map((d) => d.s))]];

    case "battery":
      // organize data
      const battery = network["battery"] || [];
      battery.forEach((d, i) => {
        if (buses_uid.includes(d.bus)) {
          d["phases"].forEach((d2, i2) => {
            data.push(
              d.soc[d2.toString()].map((d3, i3) => ({
                time: dateParser(network["time"][i3]),
                soc: +d3,
                p_bsc: +d.p_bsc[d2.toString()][i3],
                p_bsd: +d.p_bsd[d2.toString()][i3],
                phase: d2.toString(),
                bus: d.bus,
                uid: d.uid + "." + d2.toString(),
              }))
            );
          });
        }
      });
      return [
        vdata,
        vextent,
        data,
        [0, d3.max(data.flat().map((d) => d["soc"]))],
      ];

    case "dr_load":
      // organize data
      const dr_load = network["dr_load"] || [];
      dr_load.forEach((d, i) => {
        if (buses_uid.includes(d.bus)) {
          d["phases"].forEach((d2, i2) => {
            data.push(
              d.p[d2.toString()].map((d3, i3) => ({
                time: dateParser(network["time"][i3]),
                p: +d3,
                s: +d3 / +d.pf,
                q: +Math.tan(Math.acos(d.pf)) * +d3,
                phase: d2.toString(),
                bus: d.bus,
                uid: d.uid + "." + d2.toString(),
              }))
            );
          });
        }
      });
      return [vdata, vextent, data, [0, d3.max(data.flat().map((d) => d.s))]];

    case "flex_gen":
      const flex_gen = network["flex_gen"] || [];
      flex_gen.forEach((d, i) => {
        if (buses_uid.includes(d.bus)) {
          d["phases"].forEach((d2, i2) => {
            data.push(
              d.p[d2.toString()].map((d3, i3) => ({
                time: dateParser(network["time"][i3]),
                p: +d3,
                q: 0.0,
                s: +d3,
                phase: d2.toString(),
                bus: d.bus,
                uid: d.uid + "." + d2.toString(),
              }))
            );
          });
        }
      });
      return [vdata, vextent, data, [0, d3.max(data.flat().map((d) => d.p))]];

    case "flex_load":
      const flex_load = network["flex_load"] || [];
      flex_load.forEach((d, i) => {
        if (buses_uid.includes(d.bus)) {
          d["phases"].forEach((d2, i2) => {
            data.push(
              d.p[d2.toString()].map((d3, i3) => ({
                time: dateParser(network["time"][i3]),
                p: +d3,
                q: 0.0,
                s: +d3,
                phase: d2.toString(),
                bus: d.bus,
                uid: d.uid + "." + d2.toString(),
              }))
            );
          });
        }
      });
      return [vdata, vextent, data, [0, d3.max(data.flat().map((d) => d.p))]];

    case "mismatch":
      // organize data
      network.bus.forEach((d, i) => {
        if (buses_uid.includes(d.uid)) {
          d["phases"].forEach((d2, i2) => {
            if (d["p_i"] !== undefined) {
              data.push(
                d.p_i[d2.toString()].map((d3, i3) => ({
                  time: dateParser(network["time"][i3]),
                  p: +d3,
                  q: +d.q_i[d2.toString()][i3],
                  s: Math.sqrt(
                    Math.pow(+d3, 2) + Math.pow(+d.q_i[d2.toString()][i3], 2)
                  ),
                  phase: d2.toString(),
                  bus: d.bus,
                  uid: d.uid + "." + d2.toString(),
                }))
              );
            }
          });
        }
      });

      // vertical scale
      const s_extent = d3.extent(data.flat().map((d) => d.s));
      const p_extent = d3.extent(data.flat().map((d) => d.p));
      const q_extent = d3.extent(data.flat().map((d) => d.q));

      const min_y = Math.min(s_extent[0], p_extent[0], q_extent[0]);
      const max_y = Math.max(s_extent[1], p_extent[1], q_extent[1]);
      return [vdata, vextent, data, [min_y, max_y]];

    default:
      return [vdata, vextent, data, [0, 0]];
  }
}
