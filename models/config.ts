class Config {
  formulation: string;
  kVA_base: number;

  constructor(formu: string, kVA_base: number) {
    this.formulation = formu;
    this.kVA_base = kVA_base;
  }
}

export default Config;
