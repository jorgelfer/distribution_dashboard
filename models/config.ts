class Config {
  formulation: string;
  kVA_base: number;
  flat_start: boolean;

  constructor(formu: string, kVA_base: number, flat_start: boolean) {
    this.formulation = formu;
    this.kVA_base = kVA_base;
    this.flat_start = flat_start;
  }
}

export default Config;
