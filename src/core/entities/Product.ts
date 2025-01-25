// src/core/entities/Product.ts
export class Product {
    constructor(public id: string, public name: string, public price: number) {
      if (!id || !name || price <= 0) {
        throw new Error('Invalid product data');
      }
    }
  }
  