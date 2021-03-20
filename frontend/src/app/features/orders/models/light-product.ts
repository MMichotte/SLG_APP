
export class LightProduct {
  id: number;
  reference: string;
  label: string;
  displayName?: string;

  constructor(obj?: LightProduct) {
    Object.assign(this, obj);
  }
}
