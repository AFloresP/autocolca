export class Hotel {
    id: string;
    name: string;
    services: string;
    address: string;
  
    constructor(name: string, services: string, address: string) {
      this.name = name;
      this.services = services;
      this.address = address;
    }
  }