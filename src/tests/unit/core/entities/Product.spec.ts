// tests/unit/core/entities/Product.spec.ts
import { Product } from '@/core/entities/Product';

describe('Product Entity', () => {
  it('should create a valid product', () => {
    const product = new Product('1', 'Laptop', 1500);
    expect(product.name).toBe('Laptop');
    expect(product.price).toBe(1500);
  });

  it('should throw an error for invalid data', () => {
    expect(() => new Product('', '', -100)).toThrowError('Invalid product data');
  });
});
