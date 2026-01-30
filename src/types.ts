export interface Component {
  id: string;
  name: string;
  brand: string;
  price: number; // Price in IDR
  specs?: string;
  image?: string; // Path to component image
}

export interface ComponentCategory {
  name: string;
  key: keyof PCBuild;
  components: Component[];
}

export interface PCBuild {
  cpu: Component | null;
  gpu: Component | null;
  motherboard: Component | null;
  ram: Component | null;
  storage: Component | null;
  psu: Component | null;
  case: Component | null;
  cooling: Component | null;
}
