type StringDict = Record<string, string>;

export const infile1_map: StringDict = {
  "3Bus": "case3_unbalanced.dss",
  "4Bus": "4Bus-DY.dss",
  "13Bus": "IEEE13Nodeckt.dss",
  "123Bus": "IEEE123Master.dss",
  secondary: "Master.dss",
  "8500Node": "Master-unbal.dss",
  "8500Node_120": "Master-unbal.dss",
  "8500Node_1ph": "Master.dss",
  "8500Node_441": "Master.dss",
  "8500Node_510": "Master-unbal.dss",
  center_tapped: "center_tap_xfmr.dss",
};

class Case {
  networkModel: string;
  inFile1: string;

  constructor(network: string) {
    this.networkModel = network;
    this.inFile1 = infile1_map[network];
  }
}

export default Case;
