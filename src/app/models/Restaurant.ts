export class Restaurant {
  id: string;
  name: string;
  typeFoods: string;
  address: string;

  constructor(name: string, typeFoods: string, address: string) {
    this.name = name;
    this.typeFoods = typeFoods;
    this.address = address;
  }
}