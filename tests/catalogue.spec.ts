import { test, expect } from '../src/fixtures';

/** Exigence couverte : EX-02 — Consultation et tri du catalogue. */
test.describe('Catalogue', () => {
  test('CT-06 · le catalogue affiche les 6 produits', { tag: ['@smoke'] }, async ({ shop }) => {
    await expect(shop.items).toHaveCount(6);
  });

  test('CT-07 · le tri par prix croissant ordonne les produits', async ({ shop }) => {
    await shop.sortBy('lohi');

    const prices = await shop.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('CT-08 · le tri par nom de Z à A ordonne les produits', async ({ shop }) => {
    await shop.sortBy('za');

    const names = await shop.names();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('CT-09 · le compteur du panier suit les ajouts', async ({ shop }) => {
    await shop.addToCart('Sauce Labs Backpack');
    await shop.addToCart('Sauce Labs Bike Light');

    await expect(shop.cartBadge).toHaveText('2');
  });
});
