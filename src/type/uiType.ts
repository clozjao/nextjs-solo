export interface sportPageComponents {
  rulesOpen: boolean;
  langsOpen: boolean;
}

export interface globalComponents {
  language: string;
  langDisplay: string;
  rules: Rule[];
}

export interface Rule {
  id: string;
  title: string;
  content: string;
  slug: string;
}

export interface qrCodeType {
  qrCode: string;
  qrCodeOpen: boolean;
}
